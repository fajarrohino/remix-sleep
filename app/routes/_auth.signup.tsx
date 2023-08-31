import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
// import { useState } from "react";

export default function Signup() {
  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w={500}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"} color={"orange.400"}>
              Sign Up
            </Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Link to={"/posts"}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"orange.400"}
                    color={"white"}
                    _hover={{
                      bg: "orange.500",
                    }}
                  >
                    Daftar
                  </Button>
                </Link>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link to={"login"} color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
