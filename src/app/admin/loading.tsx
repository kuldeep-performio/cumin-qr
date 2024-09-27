import { Box, Spinner } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Box height={'80vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Spinner />
        </Box>
    );
}