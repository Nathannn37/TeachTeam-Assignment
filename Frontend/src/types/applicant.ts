export type Applicant = {
  id: string;
  name: string;
  course: string;
  courseCode: string;
  prevRoles: string;
  availability: string;
  skills: string[];
  credentials: string;
  selected: boolean;
  rank?: number;
  comment?: string;
  chosenCount?: number;
};

export const dummyApplicants: Applicant[] = [
  {
    id: "1",
    name: "Alice Nguyen",
    course: "Full Stack Development",
    courseCode: "COSC2758",
    prevRoles: "",
    availability: "Full-Time",
    skills: ["React", "Node.js"],
    credentials: "BSc Computer Science",
    selected: false,
    chosenCount: 0,
  },
  {
    id: "2",
    name: "Bao Tran",
    course: "Algorithms and Analysis",
    courseCode: "COSC2123",
    prevRoles: "",
    availability: "Part-Time",
    skills: ["Python", "Machine Learning"],
    credentials: "MSc Data Analytics",
    selected: false,
    chosenCount: 0,
  },
  {
    id: "3",
    name: "Carol Vu",
    course: "Full Stack Development",
    courseCode: "COSC2758",
    prevRoles: "",
    availability: "Part-Time",
    skills: ["HTML", "CSS"],
    credentials: "Diploma Web Design",
    selected: false,
    chosenCount: 0,
  },
  {
    id: "4",
    name: "Daniel Pham",
    course: "Software Eng Fundamentals",
    courseCode: "ISYS1118",
    prevRoles: "Analyst",
    availability: "Full-Time",
    skills: ["Python", "Pandas"],
    credentials: "BSc Data Science",
    selected: false,
    chosenCount: 0,
  },
  {
    id: "5",
    name: "Emily Le",
    course: "Software Requirements Engineering",
    courseCode: "COSC2274",
    prevRoles: "QA Trainee",
    availability: "Part-Time",
    skills: ["Jest", "Selenium"],
    credentials: "BSc Software Engineering",
    selected: false,
    chosenCount: 0,
  },
  {
    id: "6",
    name: "Felix Ngo",
    course: "Introduction to Cyber Security",
    courseCode: "INTE2625",
    prevRoles: "Cloud Support",
    availability: "Full-Time",
    skills: ["AWS", "Terraform"],
    credentials: "AWS Certified",
    selected: false,
    chosenCount: 0,
  },
  {
    id: "7",
    name: "Gina Trinh",
    course: "Full Stack Development",
    courseCode: "COSC2758",
    prevRoles: "Full Stack Developer",
    availability: "Full-Time",
    skills: ["React", "Express"],
    credentials: "MSc Web Development",
    selected: false,
    chosenCount: 0,
  },
  {
    id: "8",
    name: "Harry Vo",
    course: "Software Requirements Engineering",
    courseCode: "COSC2274",
    prevRoles: "Tester",
    availability: "Full-Time",
    skills: ["Cypress", "Postman"],
    credentials: "Diploma of Software Testing",
    selected: false,
    chosenCount: 0,
  },
  {
    id: "9",
    name: "Ivy Tran",
    course: "Introduction to Cyber Security",
    courseCode: "INTE2625",
    prevRoles: "DevOps Intern",
    availability: "Part-Time",
    skills: ["GCP", "CI/CD"],
    credentials: "Certification of Cloud Basics",
    selected: false,
    chosenCount: 0,
  },
  {
    id: "10",
    name: "Jason Ho",
    course: "Algorithms and Analysis",
    courseCode: "COSC2123",
    prevRoles: "Data Engineer",
    availability: "Full-Time",
    skills: ["Spark", "SQL"],
    credentials: "MSc Data Engineering",
    selected: false,
    chosenCount: 0,
  },
];
