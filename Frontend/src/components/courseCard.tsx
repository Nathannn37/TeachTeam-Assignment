import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface CourseProps {
  name: string;
  course: string;
  availability: string;
  summary: string;
}

export default function CourseCard({
  name,
  course,
  availability,
  summary,
}: CourseProps) {
  const router = useRouter();
  // Uses router to pass course and name of Application selected by tutor to courseApplication page
  const handleApply = () => {
    console.log(course);
    router.push({
      pathname: "/courseApplication",
      query: { course, name },
    });
  };

  // Course Card layout
  return (
    <Box
      bg="white"
      borderRadius="lg"
      shadow="md"
      p={5}
      maxW="5xl"
      textAlign="left"
      paddingX="8"
    >
      <VStack spacing={2}>
        <Text fontSize="xl" fontWeight="bold">
          {name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Course: {course}
        </Text>
        <Text fontSize="md" color="gray.600">
          Availability: {availability}
        </Text>
        <Text fontSize="md" color="gray.600">
          {summary}
        </Text>

        <Button onClick={handleApply} colorScheme="blue" mt={3}>
          Apply
        </Button>
      </VStack>
    </Box>
  );
}
