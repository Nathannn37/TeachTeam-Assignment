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
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { userApi } from "@/services/userApi";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
export default function SignupPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const toast = useToast();
  // Sets new user information to empty strings
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password1: "",
    password2: "",
  });

  const { setUser } = useAuth();
  // Checks that email is valid and in an email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Checks for a strong password with at least one uppercase, lowercase letter,
  //  number, symbol and is atleast 12 or more characters long
  const validatePassword = (password1: string) => {
    const hasUpperCase = /[A-Z]/.test(password1);
    const hasLowerCase = /[a-z]/.test(password1);
    const hasNumber = /\d/.test(password1);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password1);
    const isLongEnough = password1.length >= 12;

    return (
      hasUpperCase && hasLowerCase && hasNumber && isLongEnough && hasSymbol
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Checks that password and retype password match exactly
    if (newUser.password1 !== newUser.password2) {
      setError("Passwords do not match");
      return;
    }

    // Validate email
    if (!validateEmail(newUser.email)) {
      setError("Email is not valid");
      return;
    }

    // Validate password
    if (!validatePassword(newUser.password1)) {
      setError("Password does not meet the strong requirements");
      return;
    }
    // Creates a new user with the information provided and only sends
    // one of the passwords as they are the same
    let createdUser;
    try {
      createdUser = await userApi.createUser({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        password: newUser.password1,
      });
      // Sets the sign up inputs to empty strings
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password1: "",
        password2: "",
      });
      // Stores createdUser as "currentUser" into localstorage and sets as
      // currentUser
      localStorage.setItem("currentUser", JSON.stringify(createdUser));
      setUser(createdUser);
    } catch (err: unknown) {
      // If a status code error 409 appears backend is notifying that
      // the email has already been used in the database
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError("Email is already registered");
        return;
      } else {
        setError("Failed to create user");
        return;
      }
    }

    // Navigates to lecturer page
    if (createdUser.role === "Lecturer") {
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
    } else if (createdUser.role === "Candidate") {
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
    } else {
      setError("Please select valid role");
    }
  };

  return (
    <>
      <Head>
        <title>Sign up - TeachTeam</title>
        <meta name="description" content="Sign Up to TeachTeam" />
      </Head>

      <Flex minH="100vh" align="center" justify="center" bg="gray.100">
        <Box bg="white" p={8} borderRadius="lg" shadow="md" w="sm">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
            Sign Up
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
                First Name
              </Text>
              <Input
                type="text"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                placeholder="First Name"
                size="md"
                focusBorderColor="blue.500"
                isRequired
              />
            </Box>

            <Box mb={4}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Last Name
              </Text>
              <Input
                type="text"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                placeholder="Last Name"
                size="md"
                focusBorderColor="blue.500"
                isRequired
              />
            </Box>

            <Box mb={4}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Email
              </Text>
              <Input
                type="text"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Email Address"
                size="md"
                focusBorderColor="blue.500"
                isRequired
              />
            </Box>

            <Box mb={6}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Role
              </Text>
              <RadioGroup
                value={newUser.role}
                onChange={(value) => setNewUser({ ...newUser, role: value })}
                aria-required
              >
                <Stack direction="row">
                  <Radio value="Candidate">Tutor/Lab Assistant</Radio>
                  <Radio value="Lecturer">Lecturer</Radio>
                </Stack>
              </RadioGroup>
            </Box>

            <Box mb={6}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Password
              </Text>
              <Input
                type="password"
                value={newUser.password1}
                onChange={(e) =>
                  setNewUser({ ...newUser, password1: e.target.value })
                }
                placeholder="Password"
                size="md"
                focusBorderColor="blue.500"
                isRequired
              />
            </Box>

            <Box mb={6}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Retype Password
              </Text>
              <Input
                type="password"
                value={newUser.password2}
                onChange={(e) =>
                  setNewUser({ ...newUser, password2: e.target.value })
                }
                placeholder="Password"
                size="md"
                focusBorderColor="blue.500"
                isRequired
              />
            </Box>

            <Button type="submit" colorScheme="blue" width="full" size="md">
              Sign Up
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
}
