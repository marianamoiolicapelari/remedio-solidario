import { Outlet, NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { Box, Flex, Image, List, UnorderedList } from '@chakra-ui/react'

import { MenuItems } from '../../common/MenuItems'

import Logo from '../../assets/logo.png'

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {

  const [submenuOpen, setSubmenuOpen] = useState<{ [key: number]: boolean }>(
    MenuItems.reduce((acc, _, index) => ({ ...acc, [index]: false }), {})
  )

  const toggleSubmenu = (index: number) => {
    setSubmenuOpen((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <Flex
      align='center'
    >
      <Box
        height='100vh'
        width='270px'
        backgroundColor='#247ba0'
        color='white'
      >
        <Flex
          align='center'
          justify='center'
          m='5'
        >
          <Image
            src={Logo}
            alt='Imagem mãos com remédio'
            width='70px'
          />
        </Flex>

        <Flex mt={10}>
          <UnorderedList ml={3}>
            {MenuItems.map((menu, index) => (
              <React.Fragment key={index}>
                <Flex
                  align='center'
                  justifyContent='space-between'
                  width='250px'
                  mb={1}
                  p={2}
                  cursor='pointer'
                  _hover={{ backgroundColor: 'whiteAlpha.800', color: '#247ba0', borderRadius: '8' }}
                  onClick={() => toggleSubmenu(index)}
                >
                  <Flex align='center' gap={4}>
                    <Box
                      fontSize={20}
                    >
                      {menu.icon ? menu.icon : ''}
                    </Box>
                    <Box
                      fontSize={20}                
                    >
                      {menu.title}
                    </Box>
                  </Flex>
                  {menu.submenu && (
                    <IoIosArrowDown
                      style={{ transform: submenuOpen[index] ? "rotate(180deg)" : "" }}               
                    />
                  )}
                </Flex>
                {menu.submenu && submenuOpen[index] && (
                  <List mb={5}>
                    {menu.submenuItems.map((submenuItem, subIndex) => (
                      <Flex
                        as={NavLink}                     
                        fontSize='16px'
                        ml='40px'
                        mb={1}
                        p={1}
                        _hover={{ backgroundColor: 'whiteAlpha.800', color: '#247ba0', borderRadius: '6' }}
                        to={submenuItem.path} key={subIndex}                       
                        onClick={() => { toggleSubmenu(index) }}
                      >
                        {submenuItem.title}
                      </Flex>
                    ))}
                  </List>
                )}
              </React.Fragment>
            ))}
          </UnorderedList>
        </Flex>
      </Box>

      <Box flex={1}>
        <Outlet />
      </Box>
    </Flex>
  )
}

export default Home

