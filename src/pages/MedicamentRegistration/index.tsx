import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Flex, Tooltip, Input, FormControl, FormLabel } from '@chakra-ui/react'
import { Footer, Header, BaseModal, Pagination } from '../../components'
import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface FormData {
  id: string
  medicament: string
  quantity: string
  expirationDate: string
}

const MedicamentRegistration = () => {
  const [medicaments, setMedicaments] = useState<FormData[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedMedicament, setSelectedMedicament] = useState<FormData | null>(null)
  const [editedMedicament, setEditedMedicament] = useState<FormData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [medicamentsPerPage] = useState(5)


  console.log(selectedMedicament)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/medicaments')
        setMedicaments(response.data)
      } catch (error) {
        console.error('Erro ao buscar medicamentos:', error)
      }
    }

    fetchData()
  }, [])

  // Função para lidar com a mudança de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Função para obter os pacientes da página atual
  const getCurrentMedicaments = () => {
    const indexOfLastMedicament = currentPage * medicamentsPerPage;
    const indexOfFirstMedicament = indexOfLastMedicament - medicamentsPerPage;
    return medicaments.slice(indexOfFirstMedicament, indexOfLastMedicament);
  };

  const handleEditMedicament = (medicament: FormData) => {
    setSelectedMedicament(medicament)
    setEditedMedicament({ ...medicament })
    setIsEditModalOpen(true)
  }

  const handleModalClose = () => {
    setIsEditModalOpen(false)
    setSelectedMedicament(null)
    setEditedMedicament(null)
  }

  const handleDeleteMedicament = async (id: string) => {
    try {
      await api.delete(`/medicaments/${id}`)
      setMedicaments(medicaments.filter(medicament => medicament.id !== id))
      console.log(medicaments)
    } catch (error) {
      console.error('Erro ao excluir paciente:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editedMedicament) {
      const updatedMedicament = {
        ...(editedMedicament as FormData),
        [name]: value,
      }
      setEditedMedicament(updatedMedicament)
    }
  }

  const handleSubmit = async () => {
    if (editedMedicament) {
      try {
        await api.put(`/medicaments/${editedMedicament.id}`, editedMedicament)
        setMedicaments(medicaments.map(medicament => (medicament.id === editedMedicament.id ? editedMedicament : medicament)))
        setIsEditModalOpen(false)
        setSelectedMedicament(null)
        setEditedMedicament(null)
        toast.success('Dados atualizados com sucesso!')
      } catch (err) {
        toast.error('Erro ao atualizar paciente!')
      }
    }
  }

  return (
    <>
      <Header />
      <Flex direction='column' height='calc(100vh - 115px)' p={8} >
        <Text fontWeight="bold" fontSize='xl' mb={8}>Medicamentos cadastrados</Text>
        <Box height="60vh" overflowY="auto" >
          <TableContainer>
            <Table variant='simple' colorScheme='blue'>
              <Thead>
                <Tr>
                  <Th>Nome Medicamento</Th>
                  <Th>Quantidade</Th>
                  <Th>Data de Validade</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {getCurrentMedicaments().map(medicament => (
                  <Tr key={medicament.id} >
                    <Td w='50%'>{medicament.medicament}</Td>
                    <Td w='20%'>{medicament.quantity}</Td>
                    <Td w='20%'>{medicament.expirationDate}</Td>
                    <Td>
                      <Flex justify={'end'}>
                        <Tooltip label='Editar' fontSize='md' placement='top'>
                          <Button mr={2} onClick={() => handleEditMedicament(medicament)}>
                            <MdOutlineEdit />
                          </Button>
                        </Tooltip>
                        <Tooltip label='Excluir' fontSize='md' placement='top'>
                          <Button mr={2} onClick={() => handleDeleteMedicament(medicament.id)}>
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
   
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(medicaments.length / medicamentsPerPage)}
          onPageChange={handlePageChange}
        />
      </Flex>
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
            <Input type="text" name="medicament" value={editedMedicament?.medicament} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Nome do Paciente</FormLabel>
            <Input type="text" name="quantity" value={editedMedicament?.quantity} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Endereço</FormLabel>
            <Input type="text" name="expirationDate" value={editedMedicament?.expirationDate} onChange={handleInputChange} />
          </FormControl>
        </Box>
      </BaseModal>
    </>
  )
}

export default MedicamentRegistration