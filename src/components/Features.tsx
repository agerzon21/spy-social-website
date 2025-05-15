import React from 'react'
import { Box, Container, Heading, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react'
import { FaUserSecret, FaUsers, FaPuzzlePiece, FaGlobe } from 'react-icons/fa'

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ElementType;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.800'}
        mb={4}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Text fontWeight={600} fontSize="lg">{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  )
}

const Features = () => {
  return (
    <Box id="features" py={20} bg="white" width="100%">
      <Container maxW="100%" px={4}>
        <Heading
          textAlign={'center'}
          fontSize={'3xl'}
          mb={16}
        >
          Key Features
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          <Feature
            icon={FaUserSecret}
            title={'Spy Detection'}
            text={'Try to identify the spy among your friends before they figure out your secret location.'}
          />
          <Feature
            icon={FaUsers}
            title={'Party Game'}
            text={'Perfect for gatherings with 3-10 players. More players means more suspicion and fun!'}
          />
          <Feature
            icon={FaPuzzlePiece}
            title={'Creative Gameplay'}
            text={'Ask clever questions, analyze responses, and use deduction to find the spy or blend in as one.'}
          />
          <Feature
            icon={FaGlobe}
            title={'Hundreds of Locations'}
            text={'From the Space Station to the Pirate Ship, a variety of exciting locations to play in.'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Features 