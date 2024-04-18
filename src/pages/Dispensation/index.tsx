import { Box, Flex, FormControl, FormLabel, Input, Select, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Tooltip } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Footer, Header, MultSelect } from '../../components'
import { MdDeleteOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'

interface FormData {
  data: string
  paciente: string
  formula: string
  quantidade: number
}

interface FormPatients {
  id: string
  nome: string
}

interface FormMedicaments {
  id: string
  formula: string
  quantidade: number
}

const Dispensation = () => {
  const [patients, setPatients] = useState<FormPatients[]>([])
  const [medicaments, _setMedicaments] = useState('')
  const [itemList, setItemList] = useState<FormMedicaments[]>([])

  const initialValues: FormData = {
    data: getFormattedDate(),
    paciente: '',
    formula: '',
    quantidade: 0
  }

  function getFormattedDate() {
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    })
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/paciente')
        setPatients(response.data)
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error)
      }
    }
    fetchPatients()
  }, [])

  useEffect(() => {
    const fetchMedicaments = async () => {
      try {
        const response = await api.get(`/medicamento?formula=${medicaments}`)
        const medicamentsData = response.data
        setItemList(medicamentsData)
        console.log('RESPOSTA_MEDICAMENTOS', medicamentsData)
      } catch (error) {
        console.error('Erro ao buscar medicamentos:', error)
      }
    }
    fetchMedicaments()
  }, [medicaments])

  function handleAddMedicaments(event: { preventDefault: () => void }) {
    event.preventDefault()

  }

  const handleSubmitForm = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    console.log('INPUT', values.quantidade)

    try {
      const { status } = await api.post('/prescricao', values, {
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
          {({ values, setFieldValue }) => (
            <Form>
              <Flex alignItems='center' justify='space-between'>
                <Text fontWeight='bold' fontSize='xl'>Dispensação de Medicamentos</Text>
                <FormControl w='250px'>
                  <Input
                    name='date'
                    variant='unstyled'
                    value={values.data}
                    onChange={e => {
                      setFieldValue('date', e.target.value)
                    }}
                  />
                </FormControl>
              </Flex>
              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='paciente' color='#808080'>Paciente</FormLabel>
                <Select
                  id='paciente'
                  name='paciente'
                  placeholder='Selecione o nome do paciente'
                  w='73%'
                  autoFocus
                  onChange={e => {
                    setFieldValue('paciente', e.target.value)
                  }}
                >
                  {patients && patients.map(patient => (
                    <option key={patient.id} value={patient.nome}>{patient.nome}</option>
                  ))}
                </Select>
              </FormControl>

              <Flex mt={5} gap={6} w='92%'>
                <FormControl>
                  <FormLabel htmlFor="formula" color='#808080'>Digite o nome do medicamento</FormLabel>
                  <MultSelect      
                    name='formula'              
                    options={itemList.map(item => item.formula)}
                    onChange={(selectedOption: string) => {
                      setFieldValue('formula', selectedOption)
                      console.log('SETFIELDVALUE', selectedOption)
                    }}            
                  />

                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="quantidade" color='#808080'>Quantidade</FormLabel>
                  <Input
                    id='quantidade'
                    type="number"
                    name="quantidade"
                    placeholder="Quantidade"
                    onChange={e => {
                      setFieldValue('quantidade', e.target.value)
                    }}
                  />
                </FormControl>
                <FormControl display='flex' alignItems='flex-end'>
                  <Button type="submit" name="adicionar" onClick={handleAddMedicaments}>Adicionar</Button>
                </FormControl>
              </Flex>

              <Box height="20vh" overflowY="auto" mt={7}>
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

                      <Tr>
                        <Td>Dipirona</Td>
                        <Td>2</Td>
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