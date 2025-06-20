export type Course = {
    code: string;
    name: string;
};

export const DEFAULT_COURSES: Course[] = [
    { code: "COSC2123", name: "Algorithms and Analysis" },
    { code: "ISYS1118", name: "Software Eng Fundamentals" },
    { code: "COSC2758", name: "Full Stack Development" },
    { code: "INTE2625", name: "Introduction to Cyber Security" },
    { code: "COSC2274", name: "Software Requirements Engineering" }
];