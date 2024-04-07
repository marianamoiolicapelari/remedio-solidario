import { Box, Flex, FormControl, FormLabel, Input, Select, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Tooltip } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Footer, Header } from '../../components'
import { MdDeleteOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'

interface FormData {
  date: string
  patient: string
  medicament: string
  quantityInitial: number
}

interface FormPatients {
  id: string
  fullName: string
}

interface FormMedicaments {
  id: string
  medicament: string
  quantity: number
}

const Dispensation = () => {
  const [actualDate, setActualDate] = useState('')
  const [patients, setPatients] = useState<FormPatients[]>([])
  const [medicaments, setMedicaments] = useState('')
  const [itemList, setItemList] = useState<FormMedicaments[]>([])

  const initialValues: FormData = {
    date: '',
    patient: '',
    medicament: '',
    quantityInitial: 0
  }

  useEffect(() => {
    const currentDate = new Date()
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
    const formattedDate = currentDate.toLocaleDateString('pt-BR', options)
    const capitalizedWeekday = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    setActualDate(capitalizedWeekday)
  }, [])

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
    console.log('INPUT', values.quantityInitial)

    try {
      const { status } = await api.post('/dispensation', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (status === 201 || status === 200) {
        toast.success('Enviado com sucesso!')
        console.log('DADOS_ENVIADOS', values)
        resetForm()
      }
      if (status === 409) {
        toast.error('Envie novamente')
      }

    } catch (err) {
      toast.error('Falha no sistema! Tente novamente')
    }
  }

  return (
    <>
      <Header />
      <Box
        height='calc(100vh - 115px)'
        p={8}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
        >
          {({ setFieldValue }) => (
            <Form>
              <Flex alignItems='center' justify='space-between'>
                <Text fontWeight="bold" fontSize='xl'>Dispensação de Medicamentos</Text>
                <Input
                  name="actualDate"
                  value={actualDate}    
                />
              </Flex>
              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='patient' color='#808080'>Paciente</FormLabel>
                <Select
                  id='patient'
                  name='patient'
                  placeholder='Selecione o nome do paciente'
                  w='70%'
                  autoFocus
                  onChange={e => {
                    setFieldValue('patient', e.target.value)
                  }}
                >
                  {patients && patients.map(patient => (
                    <option key={patient.id} value={patient.fullName}>{patient.fullName}</option>
                  ))}
                </Select>
              </FormControl>

              <Flex mt={5} gap={6} w='92%'>
                <FormControl>
                  <FormLabel htmlFor="medicament" color='#808080'>Buscar medicamento</FormLabel>
                  <Input
                    id='medicament'
                    type="text"
                    name="medicament"
                    placeholder="Digite o nome do medicamento"
                    onChange={e => {
                      setMedicaments(e.target.value)
                      setFieldValue('medicament', e.target.value)
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="quantityInitial" color='#808080'>Quantidade</FormLabel>
                  <Input
                    id='quantityInitial'
                    type="number"
                    name="quantityInitial"
                    placeholder="Quantidade"
                    onChange={e => {
                      setFieldValue('quantityInitial', e.target.value)
                    }}
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