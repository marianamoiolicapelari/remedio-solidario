import { Box, Heading } from '@chakra-ui/react'
import { Footer, Header } from '../../components'

interface PacienteProps {}

const Paciente: React.FC<PacienteProps> = () => {
  
  return (
    <>
    <Header />
    <Box height='calc(100vh - 115px)'>
    <Heading>Paciente</Heading>
    </Box>
    <Footer />
    </>
  )
}

export default Paciente