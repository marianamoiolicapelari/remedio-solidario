import { Box, Text } from '@chakra-ui/react'
import { Footer, Header } from '../../components'

const PatientRegistration = () => {
  
  return (
    <>
    <Header />
    <Box height='calc(100vh - 115px)'>
    <Text>Lista de pacientes cadastrados</Text>
    </Box>
    <Footer />
    </>
  )
}

export default PatientRegistration