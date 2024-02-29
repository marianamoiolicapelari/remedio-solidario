import { Flex } from "@chakra-ui/react"
import { Button, Image } from '@chakra-ui/react'

import Logo from './assets/logo.png'
import RemedioSolidario from './assets/logo branco.png'

export default function App() {
  return (
    <>
      <Flex
        height='100vh'
        justify='center'
        align='center'
        bgImage='url("/src/assets/background-home.jpg")'
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
