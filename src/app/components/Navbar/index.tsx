"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const Links = [
{
  label : 'Genarate QR Code',
  href : 'qr/text'
},
{
  label : 'All QR Types', 
  href : 'qr-types'
}, 
{
  label : 'Blogs',
  href : 'blogs'
}
];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Container maxW={"7xl"}>
          {/* <Flex h={16} alignItems={"center"} justifyContent={"space-between"}> */}
          <HStack
            h={16}
            spacing={8}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Link href="/">
                <Image
                  src={"/cuminqrlogo.png"}
                  height={"70"}
                  width={"160"}
                  alt={"cuminqr"}
                />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link href={`/${link.href}`} key={link.href}>
                  <Text
                    px={4}
                    py={2}
                    borderRadius={"lg"}
                    _hover={{ color: "red.400", backgroundColor: "gray.200" }}
                    onClick={onClose}
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </HStack>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
          </HStack>
          {/* <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
            </Flex> */}
          {/* </Flex> */}

          {isOpen ? (
            <Box pb={8} display={{ md: "none" }}>
              <Stack  as={"nav"} spacing={4}>
                {Links.map((link) => (
                  <Link href={`/${link.href}`} key={link.href}>
                    <Text
                      px={4}
                      py={2}
                      borderRadius={"lg"}
                      _hover={{ color: "red.400", backgroundColor: "gray.200" }}
                      onClick={onClose}
                    >
                      {link.label}
                    </Text>
                  </Link>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  );
}
