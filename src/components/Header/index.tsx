import { Flex, Image } from "@chakra-ui/react"
import Logo from '../../assets/logo-branco.png'

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {

  return (
    <Flex
      align="center"
      justify="center"
      height='65'
      p='5'
      bgColor='#808080'
    >
      <Image
        src={Logo}
        alt='Logo projeto Remédio Solidário'
        width='100px'
      />
    </Flex>
  )
}

export default Header