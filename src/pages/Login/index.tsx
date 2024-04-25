import { useNavigate } from 'react-router-dom'
import { Flex, Button, Image } from '@chakra-ui/react'

import Logo from '../../assets/logo.png'
import RemedioSolidario from '../../assets/logo-branco.png'
import Background from '../../assets/background-home.jpg'

export default function Login() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/home/paciente')
  }
  
  return (
    <>
      <Flex
        height='100vh'
        justify='center'
        align='center'
        bgImage={`url(${Background})`}
        bgPosition='center'
        bgSize='cover'
        bgRepeat='no-repeat'
      >
        <Flex
          boxSize='md'
          bg='#247ba0'
          justify='center'
          align='center'
          direction='column'
          borderRadius='md'
          boxShadow='md'
        >
          <Image
            src={Logo}
            alt='Imagem mãos com remédio'
            boxSize='120px'
            mb='12'
          />
          <Image
            src={RemedioSolidario}
            alt='Logo projeto Remédio Solidário'
            width='220px'
            mb='16'
          />
          <Button
            onClick={handleClick}
            variant='outline'
            color='white'
            width='150px'
            _hover={{
              color:'#247ba0',
              bg: 'white'
            }}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
