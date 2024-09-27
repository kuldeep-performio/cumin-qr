"use client";

import { useAuth } from "@/context/AuthContext";
import { Box, Button } from "@chakra-ui/react";

export default function Account() {
    const { logoutUser } = useAuth();
    return (
        <Box height={'80vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            Account Page
            <Button onClick={() => logoutUser()}>Logout</Button>
        </Box>
    )
 }