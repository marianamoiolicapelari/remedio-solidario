import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Flex, Tooltip } from '@chakra-ui/react'
import { Footer, Header } from '../../components'
import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'

interface FormData {
  id: number
  cpf: string
  fullName: string
  address: string
}

const PatientRegistration = () => {
  const [patients, setPatients] = useState<FormData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/patients')
        setPatients(response.data)
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error)
      }
    };

    fetchData()
  }, [])

  const handleDeletePatient = async (id: number) => {
    try {
      await api.delete(`/patients/${id}`)
      setPatients(patients.filter(patient => patient.id !== id))
      console.log(patients)
    } catch (error) {
      console.error('Erro ao excluir paciente:', error)
    }
  }

  return (
    <>
      <Header />
      <Box height='calc(100vh - 115px)' p={8}>
        <Text fontWeight="bold" fontSize='xl' mb={8}>Pacientes cadastrados</Text>
        <TableContainer>
          <Table variant='simple' colorScheme='blue'>
            <Thead>
              <Tr>
                <Th>CPF</Th>
                <Th>Nome Paciente</Th>
                <Th>Endereço</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {patients && patients.map(patient => (
                <Tr key={patient.id} >
                  <Td w='10%'>{patient.cpf}</Td>
                  <Td >{patient.fullName}</Td>
                  <Td >{patient.address}</Td>
                  <Td>
                    <Flex justify={'end'}>
                      <Tooltip label='Editar' fontSize='md' placement='top'>
                        <Button mr={2}>
                          <MdOutlineEdit />
                        </Button>
                      </Tooltip>
                      <Tooltip label='Excluir' fontSize='md' placement='top'>
                        <Button mr={2}>
                          <MdDeleteOutline onClick={() => handleDeletePatient(patient.id)}/>
                        </Button>
                      </Tooltip>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

      </Box>
      <Footer />
    </>
  )
}

export default PatientRegistration