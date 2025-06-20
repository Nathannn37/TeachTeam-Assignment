import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Heading,
  useToast,
  Textarea,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { candidateApi } from "@/services/candidiateApi";

interface Course {
  id: number;
  courseCode: string;
  courseName: string;
}

const CandidatePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState({
    candidateId: "",
    courseId: "",
    previousRoles: "",
    appliedRole: "Tutor",
    availability: "Full-Time",
    skills: "",
    credentials: "",
  });
  const [error, setError] = useState("");
  const { user } = useAuth();
  const toast = useToast();

  // Gets all the courses from the database and sets them
  useEffect(() => {
    candidateApi.getCourses().then(setCourses);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      candidateId: user?.id ?? "",
    });
  };
  // Submits the form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validates each input
    // Check each string has letters and spaces
    const isValidprevRoles = (previousRoles: string) =>
      /^[A-Za-z\s,/]+$/.test(previousRoles) && /[A-Za-z]/.test(previousRoles);

    // Checks for letters, commas and spacs
    const isValidskills = (skills: string) =>
      /^[A-Za-z\s,/+]+$/.test(skills) && /[A-Za-z]/.test(skills);

    const isValidcred = (credentials: string) =>
      /^[A-Za-z\s,/]+$/.test(credentials) && /[A-Za-z]/.test(credentials);

    if (
      !isValidprevRoles(formData.previousRoles) ||
      !isValidskills(formData.skills) ||
      !isValidcred(formData.credentials)
    ) {
      setError("Invalid input");
      // Else submit form
    } else {
      try {
        // Submits candidate application
        const result = await candidateApi.applyCourse({
          ...formData,
          candidateId: Number(formData.candidateId),
          courseId: Number(formData.courseId),
        });

        if (result.status === 409) {
          const data = result.data;
          setError(data.error);
          return;
        }

        if (result.status !== 200 && result.status !== 201) {
          setError("Failed to submit application.");
          return;
        }

        setError("");
        setFormData({
          candidateId: "",
          courseId: "",
          previousRoles: "",
          appliedRole: "Tutor",
          availability: "Full-Time",
          skills: "",
          credentials: "",
        });
        toast({
          title: "Success!",
          description: "Your application has been submitted",
          status: "success",
          duration: 1000,
        });
      } catch (error) {
        console.error("Application submission error:", error);
        setError("You have already applied for this role in this course.");
        return;
      }
    }
  };

  return (
    <Box p={6}>
      <Heading mb={4} textAlign={"center"}>
        Apply for a Course
      </Heading>

      {error && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Course</FormLabel>
            <Select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              placeholder="Select a course"
            >
              {/* <option value="">Select a course</option> */}
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.courseCode} - {c.courseName}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select
              name="appliedRole"
              value={formData.appliedRole}
              onChange={handleChange}
            >
              <option value="Tutor">Tutor</option>
              <option value="Lab Assistant">Lab Assistant</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Availability</FormLabel>
            <Select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>List Previous Roles (if any) </FormLabel>
            <Textarea
              name="previousRoles"
              value={formData.previousRoles}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Skills</FormLabel>
            <Textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Credentials</FormLabel>
            <Textarea
              name="credentials"
              value={formData.credentials}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CandidatePage;
