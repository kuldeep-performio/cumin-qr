import { Box, Heading, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Box textAlign="center" h={'80vh'} display={'flex'} alignItems={'center'} flexDirection={'column'} justifyContent={'center'}>
      <Heading
        display="inline-block"
        as="h1"
        size="4xl"
        bgGradient="linear(to-r, red.400, red.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="20px" mt={4} mb={3}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Link href={'/'}>
      <Button
        colorScheme="red"
        bgGradient="linear(to-r, red.400, red.500, red.600)"
        color="white"
        variant="solid">
        Go to Home
      </Button></Link>
    </Box>
  )
}