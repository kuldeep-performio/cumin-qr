import { Box, Spinner, chakra } from "@chakra-ui/react";
import Image from "next/image";
import "./styles.css";

export function RotatingCumin() {
  return (
    <Box
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <chakra.div className="rotate-logo">
        <Image src={"/favicon.ico"} height={80} width={80} alt="cuminQR" />
      </chakra.div>
    </Box>
  );
}

export default function Loading() {
  return (
    <Box
      height={"40vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner />
    </Box>
  );
}
