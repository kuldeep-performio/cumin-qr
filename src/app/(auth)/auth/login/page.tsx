"use client";

import { useAuth } from "@/context/AuthContext";
import { LoginType } from "@/types/AuthTypes";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function SimpleCard() {
  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const { logIn } = useAuth();
  const router = useRouter();

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(formData.password.trim().length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    try {
      const data = await logIn(formData.email, formData.password);
      console.log('data: ', data);
      router.push("/admin/dashboard");
      // const postData = formData;
      // const response = await api.post('/users/login', postData, {});
      // console.log('POST request response:', response.data);
    } catch (error: any) {
      console.error("Error making POST request:", error.message);
    }
  };

  const { ...allData } = formData;

  // Disable submit button until all fields are filled in
  const canSubmit = [...Object.values(allData)].every(Boolean);

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"} mx={1}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} display={'flex'} width={'100%'} color={"gray.600"}>
            to enjoy all of our cool <b style={{ marginLeft : '6px' }}> features</b> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  isDisabled={!canSubmit}
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
            {error && <Text color={"red.500"}>{error}</Text>}
            <Stack pt={6}>
              <Text align={"center"}>
                Not registered yet?{" "}
                <Link style={{ textDecoration : 'underline', fontWeight : 600, color : '#4299e1' }} href={"/auth/register"}>Register now</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
