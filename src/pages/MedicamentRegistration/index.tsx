import { Box, Text } from '@chakra-ui/react'
import { Footer, Header } from '../../components'

const MedicamentRegistration = () => {
  
  return (
    <>
    <Header />
    <Box height='calc(100vh - 115px)'>
    <Text>Lista de medicamentos cadastrados</Text>
    </Box>
    <Footer />
    </>
  )
}

export default MedicamentRegistration