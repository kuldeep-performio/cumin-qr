"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import api from "@/utils/api";
import { RegistrationType } from "@/types/AuthTypes";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegistrationType>({
    // username : '',
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const { signUp } = useAuth();
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
      await signUp(formData.email, formData.password);
      setFormData({ email: "", password: "" });
      setError("")
      router.push("/admin/dashboard");
      // const postData = formData;
      // const response = await api.post('/users/register', postData, {});
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
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
        <Stack align={"center"} justify={'center'} mx={4}>
          <Heading fontSize={"4xl"}> Register your account </Heading>
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input name="username" value={formData.username} onChange={handleChange} type="username" />
            </FormControl> */}
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="name@company.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {error && <Text color={"red.500"}>{error}</Text>}
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  isDisabled={!canSubmit}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link style={{ textDecoration : 'underline', fontWeight : 600, color : '#4299e1' }} href={"/auth/login"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
    // <Flex
    //   minH={'100vh'}
    //   align={'center'}
    //   justify={'center'}
    //   bg={useColorModeValue('gray.50', 'gray.800')}>
    //   <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
    //     <Stack align={'center'}>
    //       <Heading fontSize={'4xl'} textAlign={'center'}>
    //         Sign up
    //       </Heading>
    //       <Text fontSize={'lg'} color={'gray.600'}>
    //         to enjoy all of our cool features ✌️
    //       </Text>
    //     </Stack>
    //     <Box
    //       width={'100%'}
    //       rounded={'lg'}
    //       bg={useColorModeValue('white', 'gray.700')}
    //       boxShadow={'lg'}
    //       p={8}>
    //       <Stack spacing={4}>
    //       <FormControl id="firstName" isRequired>
    //               <FormLabel>First Name</FormLabel>
    //               <Input type="text" />
    //             </FormControl>
    //         <FormControl id="email" isRequired>
    //           <FormLabel>Email address</FormLabel>
    //           <Input type="email" />
    //         </FormControl>
    //         <FormControl id="password" isRequired>
    //           <FormLabel>Password</FormLabel>
    //           <InputGroup>
    //             <Input type={showPassword ? 'text' : 'password'} />
    //             <InputRightElement h={'full'}>
    //               <Button
    //                 variant={'ghost'}
    //                 onClick={() => setShowPassword((showPassword) => !showPassword)}>
    //                 {showPassword ? <ViewIcon /> : <ViewOffIcon />}
    //               </Button>
    //             </InputRightElement>
    //           </InputGroup>
    //         </FormControl>

    //       </Stack>
    //     </Box>
    //   </Stack>
    // </Flex>
  );
}
