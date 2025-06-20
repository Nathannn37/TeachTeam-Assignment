import {
  Image,
  Box,
  Button,
  HStack,
  Text,
  Heading,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Index Page</title>
        <meta name="description" content="Index page" />
      </Head>
      <HStack borderWidth="1px" backgroundColor={"#F1F5F9"}>
        <Box width="6xl">
          <Image
            rounded="md"
            src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </Box>

        <Box width="3xl" textAlign="center">
          <Heading margin="1.5">
            A New Way To Find The Best Teaching Team
          </Heading>
          <Text margin="1.5" fontSize="lg">
            TeachTeam is the best platform to help Lecturers and Tutors connect.
          </Text>
          <Text margin="1.5" fontSize="lg">
            Lecturers struggling to find tutors? Sign up now
          </Text>
          <Text margin="1.5" fontSize="lg">
            Tutors struggling to find a job? Sign up now
          </Text>
          <Button
            as={Link}
            href="/signup"
            backgroundColor="#38BDF8"
            width="2xs"
          >
            Sign up
          </Button>
        </Box>
      </HStack>
    </div>
  );
}
