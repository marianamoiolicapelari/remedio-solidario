import { Flex } from "@chakra-ui/react"

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {

    return (
        <Flex
            align='center'
            justify='center'
            height='50'
            py='3'            
            fontWeight='500'
            color='#808080'   
            borderTopWidth='2px'      
            >
            © {new Date().getFullYear()} - Remédio Solidário | Desenvolvido por DRP04-PJI110-SALA-006GRUPO-017
        </Flex>
    )
}

export default Footer