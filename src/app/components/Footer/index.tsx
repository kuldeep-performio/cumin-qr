"use client";

import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { BiMailSend } from "react-icons/bi";
import { FiFacebook, FiInstagram, FiLinkedin, } from "react-icons/fi";

const Logo = (props: any) => {
  return (
    <Link href="/">
      <Image
        src={"/cuminqrlogo.png"}
        height={"70"}
        width={"160"}
        alt={"cuminqr"}
      />
    </Link>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={12}
      h={12}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target="_blank"
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue("gray.700", "white")} />
            </Box>
            <Text fontSize={"sm"}>
              © 2024 | Cumin QR <br />
              {"Disclaimer : 'QR Code' is a registered trademark of DENSO WAVE INCORPORATED."}
            </Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton label={"Facebook"} href={"https://www.facebook.com/profile.php?id=61557434137850"}>
                <FiFacebook size={20} color="#F56565" />
              </SocialButton>
              <SocialButton label={"LinkedIn"} href={"https://www.linkedin.com/company/102244827"}>
                <FiLinkedin size={20} color="#F56565" />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"https://www.instagram.com/cumin.qr/"}>
                <FiInstagram size={20} color="#F56565" />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href="/about">
              <Box _hover={{ color: "red.500", cursor: "pointer" }}>
                About us
              </Box>
            </Link>
            <Link href="/blogs">
              <Box _hover={{ color: "red.500", cursor: "pointer" }}>Blogs</Box>
            </Link>
            <Link href="/contact">
              <Box _hover={{ color: "red.500", cursor: "pointer" }}>
                Contact us
              </Box>
            </Link>
            <Link href="/pricing">
              <Box _hover={{ color: "red.500", cursor: "pointer" }}>
                Pricing
              </Box>
            </Link>
            {/* <Link href="/about">
              <Box _hover={{ color: "red.500", cursor: "pointer" }}>
                Testimonials
              </Box>
            </Link> */}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href="/help">
              <Box _hover={{ color: "red.500", cursor: "pointer" }}>
                Help Center
              </Box>
            </Link>
            {/* <Link href="/about">
              <Box _hover={{ color: "red.500", cursor: "pointer" }}>
                Terms of Service
              </Box>
            </Link>
            <Link href="/about">
              <Box _hover={{ color: "red.500", cursor: "pointer" }}>Legal</Box>
            </Link> */}
            <Link href="/privacy-policy">
              <Box _hover={{ color: "red.500", cursor: "pointer" }}>
                Privacy Policy
              </Box>
            </Link>
            {/* <Link href="/about">
              <Box _hover={{ color: "red.500", cursor: "pointer" }}>Satus</Box>
            </Link> */}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />
              <IconButton
                bg={useColorModeValue("primary.400", "primary.800")}
                color={useColorModeValue("white", "gray.800")}
                _hover={{
                  bg: "primary.600",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend size={26} />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
