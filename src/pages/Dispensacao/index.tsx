import { Box, Heading } from '@chakra-ui/react'
import { Footer, Header } from '../../components'

interface DispensacaoProps {}

const Dispensacao: React.FC<DispensacaoProps> = () => {
  
  return (
    <>
    <Header />
    <Box height='calc(100vh - 115px)'>
    <Heading>Dispensacao</Heading>
    </Box>
    <Footer />
    </>
  )
}

export default Dispensacao