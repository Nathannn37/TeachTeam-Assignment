import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import {
  Button,
  Input,
  Text,
  Flex,
  Box,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const toast = useToast();

  // Checks that email is valid and in an email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validates email
    if (!validateEmail(username)) {
      setError("Email is not valid");
      return;
    }

    const success = await login(username, password);

    if (success === "Invalid") {
      setError("Invalid email or password");
      return;
    }

    // Navigates to lecturer page
    if (success === "Lecturer") {
      toast({
        title: "Success!",
        description: "You will be redirected shortly.",
        status: "success",
        duration: 1000,
      });

      // Delay navigation by 1 second
      setTimeout(() => {
        router.push("/lecturer");
      }, 1000);

      // Navigates to tutor page
    } else if (success === "Candidate") {
      toast({
        title: "Success!",
        description: "You will be redirected shortly.",
        status: "success",
        duration: 1000,
      });

      // Delay navigation by 1 second
      setTimeout(() => {
        router.push("/CandidatePage");
      }, 1000);
    }
  };

  return (
    <>
      <Head>
        <title>Login - TeachTeam</title>
        <meta name="description" content="Login to TeachTeam" />
      </Head>

      <Flex minH="100vh" align="center" justify="center" bg="gray.100">
        <Box bg="white" p={8} borderRadius="lg" shadow="md" w="sm">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
            Login
          </Text>

          {error && (
            <Alert status="error" mb={4} borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box mb={4}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Email
              </Text>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
                size="md"
                focusBorderColor="blue.500"
                isRequired
              />
            </Box>

            <Box mb={6}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Password
              </Text>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                size="md"
                focusBorderColor="blue.500"
                isRequired
              />
            </Box>

            <Button type="submit" colorScheme="blue" width="full" size="md">
              Sign In
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
}
