import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    // If the user is logged in depending on the user's role if the logo button/text is clicked
    // it will route them to the respective home page else back to index page

    // Used tailwind here as the layout looked better than using chakra
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {user ? (
          user.role === "Candidate" ? (
            <>
              <HStack spacing={6}>
                <Text
                  as={Link}
                  href="/CandidatePage"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  TeachTeam
                </Text>
                <Text as={Link} href="/profile" fontSize="xl" fontWeight="bold">
                  Profile
                </Text>
                <Text
                  as={Link}
                  href="/CandidatePage"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  Application Page
                </Text>
              </HStack>
            </>
          ) : (
            <>
              <HStack spacing={6}>
                <Text
                  as={Link}
                  href="/lecturer"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  TeachTeam
                </Text>
                <Text as={Link} href="/profile" fontSize="xl" fontWeight="bold">
                  Profile
                </Text>
                <Text
                  as={Link}
                  href="/lecturer"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  Lecturer Dashboard
                </Text>
              </HStack>
            </>
          )
        ) : (
          <Text as={Link} href="/" fontSize="xl" fontWeight="bold">
            TeachTeam
          </Text>
        )}
        <div>
          {user ? ( // If the user in logged in than Welcome message appears with users name
            <div className="flex items-center gap-4">
              <span>
                Welcome, {user.firstName} {user.lastName}!
              </span>
              <Button
                onClick={logout}
                as={Link}
                href="/"
                colorScheme="blue"
                mt={3}
              >
                Logout
              </Button>
            </div>
          ) : (
            // Else sign up and sign in buttons appear
            <Flex gap={4}>
              <Button as={Link} href="/signup" backgroundColor="#38BDF8">
                Sign up
              </Button>

              <Button as={Link} href="/login" backgroundColor="#38BDF8">
                Login
              </Button>
            </Flex>
          )}
        </div>
      </div>
    </nav>
  );
}
