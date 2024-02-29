import { Flex } from "@chakra-ui/react"
import { Button, Image } from '@chakra-ui/react'

export default function App() {
  return (
    <>
      <Flex
        height='100vh'
        justify='center'
        align='center'
        backgroundImage='../src/assets/background-home.jpg'
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
            src='../src/assets/logo.png'
            alt='Imagem mãos com remédio'
            boxSize='120px'
            mb='8'
          />
          <Image
            src='../src/assets/logo branco.png'
            alt='Logo projeto Remédio Solidário'
            width='220px'
            mb='10'
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
