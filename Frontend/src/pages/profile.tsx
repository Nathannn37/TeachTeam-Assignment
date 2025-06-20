import { Box, Divider, Heading, Stack, VStack, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Box
        maxW="lg"
        mx="auto"
        mt={10}
        p={6}
        borderWidth="1px"
        borderRadius="xl"
        boxShadow="md"
        bg="white"
      >
        <Text fontSize="xl" color="red.500">
          User not found. Please log in.
        </Text>
      </Box>
    );
  }
  return (
    <>
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Profile page of user" />
      </Head>
      <Heading fontWeight="bold" textAlign="center" p={2}>
        Profile
      </Heading>
      <Box
        maxW="lg"
        mx="auto"
        mt={10}
        p={6}
        pb={10}
        mb={20}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        bg="white"
      >
        <VStack spacing={4} align="start">
          <Stack spacing={2}>
            <Text fontWeight="semibold">First Name:</Text>
            <Text>{user.firstName}</Text>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Text fontWeight="semibold">Last Name:</Text>
            <Text>{user.lastName}</Text>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Text fontWeight="semibold">Role:</Text>
            <Text>{user.role}</Text>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Text fontWeight="semibold">Email:</Text>
            <Text>{user.email}</Text>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Text fontWeight="semibold">Date Joined:</Text>
            <Text>
              {user.dateJoined instanceof Date
                ? user.dateJoined.toLocaleDateString("en-GB")
                : new Date(user.dateJoined).toLocaleDateString("en-GB")}
            </Text>
          </Stack>
        </VStack>
      </Box>
    </>
  );
}
