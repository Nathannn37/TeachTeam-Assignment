import React, { useEffect, useState } from "react";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { lecturerApi } from "@/services/lecturerApi";
import { Alert, AlertIcon, useToast } from "@chakra-ui/react";

interface Applicant {
  id: string;
  fullName: string;
  courseName: string;
  courseCode: string;
  availability: string;
  skills: string[];
  credentials: string;
  appliedRole: string;
  prevRoles?: string;
  selected?: boolean;
  rank?: number;
  comment?: string;
  chosenCount?: number;
  applicationId?: number;
}

interface Review {
  applicationId: number;
  selected?: boolean;
  rank?: number;
  comment?: string;
}

const COLORS = ["#0088FE", "#FF8042", "#AAAAAA"];

const LecturerPage: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [sortAvailabilityOrder, setSortAvailabilityOrder] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const lecturerId = user?.lecturerId;
  const toast = useToast();

  const [globalStats, setGlobalStats] = useState({
    mostChosen: { fullName: "", count: "0" },
    leastChosen: { fullName: "", count: "0" },
    unselected: [] as { fullName: string }[],
  });

  const saveReview = async (applicant: Applicant) => {
    if (!applicant.applicationId) {
      console.warn("❗ Missing applicationId, not sending", applicant);
      return;
    }
    if (typeof applicant.rank !== "number" || applicant.rank <= 0) {
      setError("Rank needs to be a postive integer");
      return;
    }
    if (typeof applicant.comment !== "string") {
      setError("Invalid comment input");
      return;
    }

    try {
      await lecturerApi.saveReview({
        applicationId: applicant.applicationId,
        selected: !!applicant.selected,
        rank: applicant.rank,
        comment: applicant.comment,
        lecturerId: parseInt(lecturerId!),
      });
      toast({
        title: "Success!",
        description: "You will be redirected shortly.",
        status: "success",
        duration: 1000,
      });
      console.log("✅ Review saved:", applicant.fullName);
      fetchApplicantsAndStats();
    } catch (err) {
      console.error("❌ Error while sending review:", err);
    }
  };
  // This function gets all applications and statistics for data visualisation
  // and displays them
  const fetchApplicantsAndStats = async () => {
    if (!lecturerId) return;
    const params = {
      name: search,
      role: filterRole,
      availability: filterAvailability,
      skill: filterSkill,
      lecturerId: lecturerId || "",
    };
    const data = await lecturerApi.getApplicants(params);
    if (!Array.isArray(data)) {
      setApplicants([]);
      return;
    }
    const reviews: Review[] = await lecturerApi.getReviewed(
      parseInt(lecturerId)
    );
    const transformed = data.map((a: Applicant, i: number) => {
      const applicationId = a.applicationId;
      const review = reviews.find(
        (r: Review) => r.applicationId === applicationId
      );
      return {
        id: String(i + 1),
        fullName: a.fullName,
        courseName: a.courseName,
        courseCode: a.courseCode,
        availability: a.availability,
        appliedRole: a.appliedRole,
        skills: a.skills,
        credentials: a.credentials,
        selected: review?.selected || false,
        rank: review?.rank,
        comment: review?.comment || "",
        chosenCount: review?.selected ? 1 : 0,
        applicationId,
      };
    });
    setApplicants(transformed);
    const stats = await lecturerApi.getReviewStats();
    setGlobalStats(stats);
  };

  const submitAll = () => {
    console.log("Submission is working");
    applicants.forEach((a) => {
      if (a.selected && a.rank !== undefined && a.comment?.trim()) {
        console.log("Submitting", a);
        saveReview(a);
        setError("");
      }
    });
  };

  useEffect(() => {
    fetchApplicantsAndStats();
  }, [lecturerId, search, filterRole, filterAvailability, filterSkill]);

  const handleSelect = (id: string) => {
    setApplicants((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updated = {
            ...a,
            selected: !a.selected,
            chosenCount: !a.selected
              ? (a.chosenCount || 0) + 1
              : a.chosenCount || 0,
          };
          saveReview(updated);
          return updated;
        }
        return a;
      })
    );
  };

  const handleRankChange = (id: string, rank: number) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, rank } : a))
    );
  };

  const handleCommentChange = (id: string, comment: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, comment } : a))
    );
  };

  const filtered = applicants.filter((a) => {
    const matchCourse =
      selectedCourse === "" || a.courseName === selectedCourse;
    const matchSearch =
      (a.fullName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (a.courseName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (a.skills?.join(" ") ?? "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (a.availability ?? "").toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "" || a.appliedRole === filterRole;
    const matchSkill = filterSkill === "" || a.skills.includes(filterSkill);
    const matchAvailability =
      filterAvailability === "" || a.availability === filterAvailability;
    return (
      matchCourse && matchSearch && matchRole && matchSkill && matchAvailability
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortAvailabilityOrder) {
      const order: Record<string, number> = { "Full-Time": 1, "Part-Time": 2 };
      return sortAvailabilityOrder === "ftfirst"
        ? order[a.availability] - order[b.availability]
        : order[b.availability] - order[a.availability];
    }
    return 0;
  });

  const selectedRanks = applicants
    .filter((a) => a.selected && a.rank !== undefined)
    .map((a) => a.rank);
  const duplicateRanks = selectedRanks.filter(
    (rank, index, arr) => arr.indexOf(rank) !== index
  );

  const graphData = [
    { name: "Most Chosen", value: parseInt(globalStats.mostChosen.count) || 0 },
    {
      name: "Least Chosen",
      value: parseInt(globalStats.leastChosen.count) || 0,
    },
    { name: "Never Selected", value: globalStats.unselected.length },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <Head>
        <title>Lecturer Page</title>
      </Head>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-4xl flex flex-col items-center justify-center pt-20 pb-12">
          <h1 className="text-lg font-extrabold text-indigo-700">
            🎓 Lecturer Dashboard
          </h1>
        </div>

        <div className="bg-white rounded shadow p-4 space-y-2">
          <h2 className="text-lg font-semibold">🌐 Global Selection Stats</h2>
          <p>
            <b>🏆 Most Chosen:</b> {globalStats.mostChosen.fullName} (
            {globalStats.mostChosen.count})
          </p>
          <p>
            <b>🥈 Least Chosen:</b> {globalStats.leastChosen.fullName} (
            {globalStats.leastChosen.count})
          </p>
          <p>
            <b>❌ Never Selected:</b> {globalStats.unselected.length}
          </p>
          <ul className="list-disc pl-6 text-sm text-gray-600">
            {globalStats.unselected.map((u, i) => (
              <li key={i}>{u.fullName}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="bg-white shadow p-4 rounded">
            <h3 className="font-semibold mb-2 text-gray-800">📊 Bar Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <h3 className="font-semibold mb-2 text-gray-800">🥧 Pie Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={graphData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {graphData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {error && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <div className="text-right">
          <Button
            className="bg-blue-400 hover:bg-blue-500 text-black px-10 py-5 text-2xl font-extrabold rounded-2xl shadow-xl transition duration-300"
            onClick={submitAll}
          >
            ✅ Submit All Selections
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2 text-sm w-full"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">All Courses</option>
            {Array.from(new Set(applicants.map((a) => a.courseName))).map(
              (course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              )
            )}
          </select>
          <select
            className="border rounded px-3 py-2 text-sm w-full"
            value={sortAvailabilityOrder}
            onChange={(e) => setSortAvailabilityOrder(e.target.value)}
          >
            <option value="">Sort Availability</option>
            <option value="ftfirst">Full-Time First</option>
            <option value="ptfirst">Part-Time First</option>
          </select>
          <select
            className="border rounded px-3 py-2 text-sm w-full"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="Tutor">Tutor</option>
            <option value="Lab Assistant">Lab Assistant</option>
          </select>
          <select
            className="border rounded px-3 py-2 text-sm w-full"
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
          >
            <option value="">All Availability</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>
          <Input
            placeholder="Filter by Skill (e.g. Python)"
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {sorted.map((applicant) => (
            <Card key={applicant.id} className="bg-white rounded-lg shadow-md">
              <CardContent className="p-5 space-y-3">
                <div className="text-lg font-semibold">
                  {applicant.fullName}
                </div>
                <div>
                  Course: {applicant.courseName} ({applicant.courseCode})
                </div>
                <div>Availability: {applicant.availability}</div>
                <div>
                  Skills:{" "}
                  {Array.isArray(applicant.skills)
                    ? applicant.skills.join(", ")
                    : applicant.skills
                    ? String(applicant.skills)
                    : ""}
                </div>
                <div>Credentials: {applicant.credentials}</div>
                <div>Role: {applicant.appliedRole}</div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={applicant.selected}
                    onChange={() => handleSelect(applicant.id)}
                  />
                  <label>Select Candidate</label>
                </div>
                {applicant.selected && (
                  <>
                    <Input
                      type="number"
                      placeholder="Rank"
                      value={applicant.rank || ""}
                      onChange={(e) =>
                        handleRankChange(applicant.id, parseInt(e.target.value))
                      }
                    />
                    {duplicateRanks.includes(applicant.rank) && (
                      <p className="text-sm text-red-500">
                        ⚠️ This rank is already used.
                      </p>
                    )}
                    <Textarea
                      placeholder="Comment"
                      value={applicant.comment || ""}
                      onChange={(e) =>
                        handleCommentChange(applicant.id, e.target.value)
                      }
                    />
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LecturerPage;
