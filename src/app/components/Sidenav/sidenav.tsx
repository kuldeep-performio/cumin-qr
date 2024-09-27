import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  DrawerBody,
  Box,
  Divider,
  DrawerFooter,
  HStack,
  Text,
} from "@chakra-ui/react";
import SidenavItems, { SidenavItem } from "./sideNavItems";
import { useSidenav } from "@/context/SideNavContext";
import Image from "next/image";
import Link from "next/link";

export interface SidenavProps {
  navItems: SidenavItem[];
  activePath: string;
  user: any;
}

export function Sidenav({ navItems, activePath, user }: SidenavProps) {
  const { isOpen, onClose } = useSidenav();

  return (
    <React.Fragment>
      <VStack
        spacing={2}
        alignItems={"flex-start"}
        as="nav"
        height={"100%"}
        justifyContent={"space-between"}
        display={{ base: "none", md: "flex" }}
      >
        <Box width={"100%"}>
          <div style={{ width: "100%", marginBottom: "14px" }}>
            <Box py={2} width={"100%"} px={6}>
              <Link href={"/admin/dashboard"}>
                <Image
                  height={100}
                  width={120}
                  src={"/cuminqr-logo-white..png"}
                  alt="cuminqr"
                />
              </Link>
            </Box>
            <Divider color={"white"} />
          </div>
          <SidenavItems activePath={activePath} navItems={navItems} />
        </Box>
        <Link href={"/admin/account"}>
          <HStack px={"14px"} py={"12px"} gap={"12px"} cursor={"pointer"}>
            <Box width={"42px"} height={"42px"} borderRadius={"50%"}>
              <Image
                height={100}
                width={120}
                src={"/static/blank_profile.webp"}
                alt="cuminqr"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
            </Box>
            <VStack alignItems={"flex-start"} gap={0}>
              <Text fontSize={12} color={"gray.400"}>
                Your account
              </Text>
              <Text
                isTruncated
                color={"white"}
                maxW={"109px"}
                fontSize={14}
                fontWeight={500}
              >
                {user?.email.split("@")[0]}
              </Text>
            </VStack>
          </HStack>
        </Link>
      </VStack>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom={"1px"} borderColor={"gray.200"}>
            <Box width={"100%"}>
              <Link href={"/admin/dashboard"}>
                <Image
                  height={100}
                  width={120}
                  src={"/cuminqrlogo.png"}
                  alt="cuminqr"
                />
              </Link>
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <SidenavItems
              onClose={onClose}
              activePath={activePath}
              navItems={navItems}
              mode="over"
            />
          </DrawerBody>
          <DrawerFooter>
            <Link  href={"/admin/account" } style={{ width : '100%' }} onClick={() => onClose && onClose()}>
              <HStack  px={"14px"} py={"12px"} gap={"12px"} cursor={"pointer"}>
                <Box width={"58px"} height={"58px"} borderRadius={"50%"}>
                  <Image
                    height={100}
                    width={120}
                    src={"/static/blank_profile.webp"}
                    alt="cuminqr"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </Box>
                <VStack alignItems={"flex-start"} gap={0}>
                  <Text fontSize={12} color={"gray.400"}>
                    Your account
                  </Text>
                  <Text
                    isTruncated
                    maxW={"169px"}
                    fontSize={14}
                    fontWeight={500}
                  >
                    {user?.email.split("@")[0]}
                  </Text>
                </VStack>
              </HStack>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidenav;
