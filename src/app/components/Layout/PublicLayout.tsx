import { ReactNode, useMemo } from "react";
import Footer from "../Footer";
import NavBar from "../Navbar";
import { RotatingCumin } from "@/app/loading";

export default function PublicLayout({
  children,
  user,
}: {
  children: ReactNode;
  user: any;
}) {
  const isLoggedin = useMemo(() => {
    if(user == false ) {
      return 'loading'
    }
  }, [user]);

  if(isLoggedin === 'loading') return <RotatingCumin />

  return (
    <>
      <NavBar user={user} />
      {children}
      <Footer />
    </>
  );
}
