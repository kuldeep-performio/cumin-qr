"use client";

import { usePathname, } from "next/navigation";
import PublicLayout from "./PublicLayout";
import AdminLayout from "./AdminLayout";
import { ReactNode, } from "react";
import { useUser } from "@/utils/useUser";

const layouts = {
  public: PublicLayout,
  admin: AdminLayout,
};

function getLayoutType(path: any) {
  if (path.startsWith("/admin")) {
    return "admin";
  }
  return "public";
}

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const layoutType = getLayoutType(pathname);

  const LayoutComponent = layouts[layoutType] || PublicLayout;
  const user = useUser();

  // Render the children with the layout
  return <LayoutComponent user={user}>{children}</LayoutComponent>;
};

export default LayoutWrapper;
