import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Flex, Tooltip, Input, FormControl, FormLabel } from '@chakra-ui/react'
import { Footer, Header, BaseModal } from '../../components'
import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface FormData {
  id: string
  cpf: string
  fullName: string
  address: string
}

const PatientRegistration = () => {
  const [patients, setPatients] = useState<FormData[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<FormData | null>(null)
  const [editedPatient, setEditedPatient] = useState<FormData | null>(null)

  console.log(selectedPatient)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/patients')
        setPatients(response.data)
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error)
      }
    }

    fetchData()
  }, [])

  const handleEditPatient = (patient: FormData) => {
    setSelectedPatient(patient)
    setEditedPatient({ ...patient })
    setIsEditModalOpen(true)
  }

  const handleModalClose = () => {
    setIsEditModalOpen(false)
    setSelectedPatient(null)
    setEditedPatient(null)
  }

  const handleDeletePatient = async (id: string) => {
    try {
      await api.delete(`/patients/${id}`)
      setPatients(patients.filter(patient => patient.id !== id))
      console.log(patients)
    } catch (error) {
      console.error('Erro ao excluir paciente:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editedPatient) {
      const updatedPatient = {
        ...(editedPatient as FormData),
        [name]: value,
      }
      setEditedPatient(updatedPatient)
    }
  }

  const handleSubmit = async () => {
    if (editedPatient) {
      try {
        await api.put(`/patients/${editedPatient.id}`, editedPatient)
        setPatients(patients.map(patient => (patient.id === editedPatient.id ? editedPatient : patient)))
        setIsEditModalOpen(false)
        setSelectedPatient(null)
        setEditedPatient(null)
        toast.success('Dados atualizados com sucesso!')
      } catch (err) {
        toast.error('Erro ao atualizar paciente!')
      }
    }
  }

  return (
    <>
      <Header />
      <Box height='calc(100vh - 115px)' p={8}>
        <Text fontWeight="bold" fontSize='xl' mb={8}>Pacientes cadastrados</Text>
        <Box height={'auto'} maxHeight="60vh" overflowY="auto">
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
                          <Button mr={2} onClick={() => handleEditPatient(patient)}>
                            <MdOutlineEdit />
                          </Button>
                        </Tooltip>
                        <Tooltip label='Excluir' fontSize='md' placement='top'>
                          <Button mr={2} onClick={() => handleDeletePatient(patient.id)}>
                            <MdDeleteOutline />
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
      </Box>
      <Footer />

      <BaseModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        modalHeaderText="Editar Dados do Paciente"
        modalFooter={<Button type="submit" colorScheme="blue" mt={3} onClick={handleSubmit}>Salvar</Button>}
      >
        <Box as="form" >
          <FormControl>
            <FormLabel>CPF</FormLabel>
            <Input type="text" name="cpf" value={editedPatient?.cpf} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Nome do Paciente</FormLabel>
            <Input type="text" name="fullName" value={editedPatient?.fullName} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Endereço</FormLabel>
            <Input type="text" name="address" value={editedPatient?.address} onChange={handleInputChange} />
          </FormControl>
        </Box>
      </BaseModal>
    </>
  )
}

export default PatientRegistration