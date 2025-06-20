import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      backgroundColor="#1E293B"
      height="16"
      alignItems={"center"}
      display={"flex"}
      justifyContent={"center"}
    >
      <Flex direction="column" align="center">
        <HStack spacing={4} fontSize="sm" color="#CBD5E1">
          <Link href="#">About us</Link>
          <Text>|</Text>
          <Link href="#">Contact us</Link>
          <Text>|</Text>
          <Link href="#">Help Center</Link>
          <Text>|</Text>
          <Link href="#">Privacy Policy</Link>
        </HStack>

        <Text fontSize="sm" color="#CBD5E1">
          Copyright © TeachTeam 2025
        </Text>
      </Flex>
    </Box>
  );
}
