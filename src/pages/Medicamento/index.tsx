import { Box, Heading } from '@chakra-ui/react'
import { Footer, Header } from '../../components'

interface MedicamentoProps {}

const Medicamento: React.FC<MedicamentoProps> = () => {
  
  return (
    <>
    <Header />
    <Box height='calc(100vh - 115px)'>
    <Heading>Medicamento</Heading>
    </Box>
    <Footer />
    </>
  )
}

export default Medicamento