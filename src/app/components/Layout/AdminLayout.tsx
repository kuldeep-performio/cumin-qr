"use client";

import React, { ReactNode, use, useMemo } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { AiOutlineQrcode } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import { AiOutlineFormatPainter } from "react-icons/ai";
import { SidenavItem } from "../Sidenav/sideNavItems";
import SidenavProvider from "@/context/SideNavContext";
import SidenavContainer from "../Sidenav/sideNavContainer";
import { Navbar } from "../Navbar/navbar";
import Sidenav from "../Sidenav/sidenav";
import { usePathname } from "next/navigation";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { RotatingCumin } from "@/app/loading";

export default function AdminLayout({
  children,
  user,
}: {
  children: ReactNode;
  user: any;
}) {
  const navItems: SidenavItem[] = [
    { icon: AiFillDashboard, label: "Dashboard", to: "/admin/dashboard",  active: ['dashboard'] },
    { icon: AiOutlineQrcode, label: "QR Codes", to: "/admin/qr-codes", active: ['qr-codes']  },
    { icon: AiOutlineLink, label: "Links", to: "/admin/links", active: ['links', 'link-stats']},
    {
      icon: AiOutlineFormatPainter,
      label: "QR Styles",
      to: "/admin/qr-styles",
      active: ['qr-styles'],
    },
  ];

  const pathname = usePathname();

  const isLoggedin = useMemo(() => {
    if (user == false) {
      return "loading";
    } else if (user) {
      return true;
    } else {
      return false;
    }
  }, [user]);

  if (isLoggedin === "loading") return <RotatingCumin />;
  if (isLoggedin === false)
    return (
      <div>
        Not logged in{" "}
        <Link href={"/auth/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    );

  return (
    <SidenavProvider>
      <SidenavContainer
        sidenav={<Sidenav navItems={navItems} activePath={pathname} user={user} />}
      >
        <main>
          <Flex backgroundColor={"gray.50"}>
            <Navbar />
            <Box
              // display={"flex"}
              justifyContent={"center"}
              py={2}
              width={"100%"}
              px={6}
              display={{ base: "flex", md: "none" }}
            >
              <Link href={"/admin/dashboard"}>
                <Image
                  height={100}
                  width={120}
                  src={"/cuminqrlogo.png"}
                  alt="cuminqr"
                />
              </Link>
            </Box>
          </Flex>
          {children}
        </main>
      </SidenavContainer>
    </SidenavProvider>
    // <>
    //   {/* <!-- ===== Page Wrapper Start ===== --> */}
    //   <div className="flex h-screen overflow-hidden">
    //     {/* <!-- ===== Sidebar Start ===== --> */}
    //     <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    //     {/* <!-- ===== Sidebar End ===== --> */}

    //     {/* <!-- ===== Content Area Start ===== --> */}
    //     <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
    //       {/* <!-- ===== Header Start ===== --> */}
    //       {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
    //       {/* <!-- ===== Header End ===== --> */}

    //       {/* <!-- ===== Main Content Start ===== --> */}
    //       <main>
    //         <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
    //           {children}
    //         </div>
    //       </main>
    //       {/* <!-- ===== Main Content End ===== --> */}
    //     </div>
    //     {/* <!-- ===== Content Area End ===== --> */}
    //   </div>
    //   {/* <!-- ===== Page Wrapper End ===== --> */}
    // </>
  );
}
