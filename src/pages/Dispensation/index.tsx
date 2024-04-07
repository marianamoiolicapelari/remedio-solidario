import { Box, Flex, FormControl, FormLabel, Input, Select, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Tooltip } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Footer, Header } from '../../components'
import { MdDeleteOutline } from 'react-icons/md'
// import { toast } from 'react-toastify'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'

interface FormData {
  id: string
  fullName: string
}

interface FormMedicaments {
  id: string
  medicament: string
  quantity: number
}

const Dispensation = () => {
  const [patients, setPatients] = useState<FormData[]>([])
  const [medicaments, setMedicaments] = useState('')
  const [itemList, setItemList] = useState<FormMedicaments[]>([])

  const actualDate = Date()

  const initialValues: FormData = {
    id: '',
    fullName: ''
  }

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

  function handleAddMedicaments(event: { preventDefault: () => void }) {
    event.preventDefault()

    async function getMedicaments() {
      const response = await api.get(`/medicaments?medicament=${medicaments}`)
      console.log('RESPOSTA_MEDICAMENTOS', response)
      const { id, medicament, quantity } = response.data[0]
      

      setItemList(prevItems =>
        [...prevItems,
          {
            'id': id,
            'medicament': medicament,
            'quantity': quantity
          }
        ])
    }
    getMedicaments()
  }

  const handleSubmitForm = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    // const formData = new FormData()
    // formData.append('cpf', values.cpf)
    // formData.append('fullName', values.fullName)
    // formData.append('address', values.address)

    try {
      const { status } = await api.post('/dispensation', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (status === 201 || status === 200) {
        // toast.success('Medicamento cadastrado com sucesso!')
        resetForm()
      }
      if (status === 409) {
        // toast.error('Medicamento já cadastrado')
      }

    } catch (err) {
      // toast.error('Falha no sistema! Tente novamente')
    }
  }

  return (
    <>
      <Header />
      <Box
        height='calc(100vh - 115px)'
        p={8}
      >
        <Flex alignItems='center' justify='space-between'>
          <Text fontWeight="bold" fontSize='xl'>Dispensação de Medicamentos</Text>
          <Text>{actualDate}</Text>
        </Flex>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='patient' color='#808080'>Paciente</FormLabel>
                <Select
                  id='patient'
                  name='patient'
                  placeholder='Selecione o nome do paciente'
                  w='70%'
                  autoFocus
                >
                  {patients && patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.fullName}</option>
                  ))}
                </Select>
                {errors.fullName && touched.fullName && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.fullName}</Text>}
              </FormControl>

              <Flex mt={5} gap={6} w='92%'>
                <FormControl>
                  <FormLabel htmlFor="medicament" color='#808080'>Buscar medicamento</FormLabel>
                  <Input
                    id='medicament'
                    type="text"
                    name="medicament"
                    placeholder="Digite o nome do medicamento"
                    onChange={e => setMedicaments(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="quantity" color='#808080'>Quantidade</FormLabel>
                  <Input
                    id='quantity'
                    type="number"
                    name="quantity"
                    placeholder="Quantidade"            
                  />
                </FormControl>
                <FormControl display='flex' alignItems='flex-end'>
                  <Button type="submit" name="adicionar" onClick={handleAddMedicaments}>Adicionar</Button>
                </FormControl>
              </Flex>

              <Box height="35vh" overflowY="auto" mt={7}>
                <TableContainer>
                  <Table variant='simple' size='sm' colorScheme='blue'>
                    <Thead>
                      <Tr>
                        <Th>Nome Medicamento</Th>
                        <Th>Quantidade</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {itemList.map(item => (
                        <Tr key={item.id}>
                          <Td>{item.medicament}</Td>
                          <Td>{item.quantity}</Td>
                          <Td>
                            <Flex justify={'end'}>
                              <Tooltip label='Excluir' fontSize='md' placement='top'>
                                {/* <Button mr={2} onClick={() => handleDeleteMedicament(medicament.id)}> */}
                                <Button>
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
              <Flex justify={'flex-end'}>
                <Button
                  mt={10}
                  variant='outline'
                  type='submit'
                  colorScheme='blue'
                  width='20%'
                > Dispensar
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
      <Footer />
    </>
  )
}

export default Dispensation