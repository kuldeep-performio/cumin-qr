"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { AuthContextProvider } from "@/context/AuthContext";
import { ServiceContextProvider } from "@/context/ServiceContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <ServiceContextProvider>{children}</ServiceContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
