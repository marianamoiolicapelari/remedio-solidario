import { Box, Flex, FormControl, FormLabel, Input, Select, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Tooltip } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Footer, Header, MultSelect, BaseModal } from '../../components'
import { MdDeleteOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'

interface FormData {
  data: string
  paciente: FormPatients
  medicamento: FormMedicaments
  quantidade: number
}

interface FormPatients {
  id: number
  cpf: string
  nome: string
  endereco: string
}

interface FormMedicaments {
  id: number
  formula: string
  quantidade: number
  vencimento: string
}

interface ModalData {
  data: string;
  paciente: FormPatients;
  medicamentos: FormMedicaments[];
  medicamentoList: FormMedicaments[];
}

const Dispensation = () => {
  const [patients, setPatients] = useState<FormPatients[]>([])
  const [itemList, setItemList] = useState<FormMedicaments[]>([])
  const [tableItems, setTableItems] = useState<FormMedicaments[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [modalData, setModalData] = useState<ModalData | null>(null)

  console.log('MODALDATA', modalData)

  const getDate = () => {
    const currentDate = new Date()
    return currentDate.toISOString().slice(0, 10)
  }

  const initialValues: FormData = {
    data: getDate(),
    paciente: {
      id: 0,
      cpf: '',
      nome: '',
      endereco: ''
    } as FormPatients,
    medicamento: {
      id: 0,
      formula: '',
      quantidade: 0,
      vencimento: ''
    } as FormMedicaments,
    quantidade: 0
  }

  const formattedDate = (data: string) => {
    const currentDate = new Date(data)
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
        const response = await api.get('/medicamento')
        setItemList(response.data)
      } catch (error) {
        console.error('Erro ao buscar medicamentos:', error)
      }
    }
    fetchMedicaments()
  }, [])

  const handleAddMedicaments = (formula: FormMedicaments, event: { preventDefault: () => void }) => {
    event.preventDefault()

    const existingItem = tableItems.find((item) => item.id === formula.id)

    if (existingItem) {
      toast.error('Este medicamento já foi adicionado.')
      return
    }

    const newItem: FormMedicaments = {
      id: formula.id,
      formula: formula.formula,
      quantidade: formula.quantidade,
      vencimento: formula.vencimento
    }
    setTableItems([...tableItems, newItem])
  }

  const handleDeleteMedicament = (id: number) => {
    try {
      setTableItems(tableItems.filter(formula => formula.id !== id))
    } catch (error) {
      console.error('Erro ao excluir paciente:', error)
    }
  }

  const handleModalClose = () => {
    setIsEditModalOpen(false)
    setModalData(null)
  }

  const handlePrint = () => { }

  const handleSubmitForm = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    const { paciente } = values
    try {
      const postData = {
        data: new Date().toISOString().slice(0, 10), // Atualiza a data para o momento do envio
        paciente,
        medicamentos: tableItems // Adiciona os medicamentos selecionados
      }

      console.log('POSTDATA', postData)

      const { status } = await api.post('/prescricao', postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (status === 201 || status === 200) {
        toast.success('Enviado com sucesso!')
        setTableItems([])
        resetForm()
        // Abrir o modal e definir os dados a serem exibidos
        setIsEditModalOpen(true)
        setModalData({
          ...postData,
          medicamentoList: postData.medicamentos
        })
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
                <FormControl w='210px'>
                  <Input
                    name='date'
                    variant='unstyled'
                    value={formattedDate(values.data)}
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
                    const paciente = patients.find(patient => patient.id === Number(e.target.value))
                    setFieldValue('paciente', paciente)
                  }}
                >
                  {patients && patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.nome}</option>
                  ))}
                </Select>
              </FormControl>

              <Flex mt={5} gap={6} w='92%'>
                <FormControl>
                  <FormLabel htmlFor="medicamento" color='#808080'>Digite o nome do medicamento</FormLabel>
                  <MultSelect
                    inputValue={inputValue}
                    name='medicamento'
                    options={itemList.map(item => item.formula)}
                    onChange={(selectedOption: string) => {
                      const option = itemList.find((item) => item.formula === selectedOption)
                      setFieldValue('medicamento', option)
                      setInputValue(selectedOption)
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
                    value={values.quantidade || ''}
                    onChange={e => {
                      setFieldValue('quantidade', Number(e.target.value))
                    }}
                  />
                </FormControl>

                <FormControl display='flex' alignItems='flex-end'>
                  <Button
                    name="adicionar"
                    onClick={(e) => {
                      handleAddMedicaments({ ...values.medicamento, quantidade: values.quantidade }, e)
                      setInputValue('')
                      setFieldValue('quantidade', '')
                    }}
                  >Adicionar</Button>
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
                      {tableItems.map((item, index) => (
                        <Tr key={index}>
                          <Td>{item.formula}</Td>
                          <Td>{item.quantidade}</Td>
                          <Td>
                            <Flex justify={'end'}>
                              <Tooltip label='Excluir' fontSize='md' placement='top'>
                                <Button onClick={() => handleDeleteMedicament(item.id)}>
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
      <BaseModal
        size='xl'
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        modalHeaderText="Remédio Solidário"
        modalFooter={<Button type="submit" colorScheme="blue" mt={3} onClick={handlePrint}>Deseja Imprimir?</Button>}
      >
        <Box>
          <Input type="text" value={modalData?.data} variant='unstyled' isReadOnly />
          <Input type="text" value={modalData?.paciente.nome} variant='unstyled' isReadOnly />
          <Input type="text" value={modalData?.paciente.cpf} variant='unstyled' isReadOnly />
          <Input type="text" value={modalData?.paciente.endereco} variant='unstyled' isReadOnly />
          {modalData?.medicamentoList.map((medicamento, id) => (
            <>
              <Input key={id} type="text" value={medicamento.formula} variant='unstyled' isReadOnly />
              <Input key={id} type="text" value={medicamento.quantidade} variant='unstyled' isReadOnly />
            </>
          ))}
        </Box>
      </BaseModal >
    </>
  )
}

export default Dispensation