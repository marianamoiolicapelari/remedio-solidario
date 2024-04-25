import { Box, Flex, FormControl, FormLabel, Input, Select, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Tooltip } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Footer, Header, MultSelect } from '../../components'
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
  nome: string
  endereco: string
}

interface FormMedicaments {
  id: number
  formula: string
  quantidade: number
  vencimento: string
}

const Dispensation = () => {
  const [patients, setPatients] = useState<FormPatients[]>([])
  const [itemList, setItemList] = useState<FormMedicaments[]>([])
  const [tableItems, setTableItems] = useState<FormMedicaments[]>([])

  const getFormattedDate = () => {
    const currentDate = new Date()
    return currentDate.toISOString().slice(0, 10)
  }


  const initialValues: FormData = {  
    data: getFormattedDate(),
    paciente: {} as FormPatients,
    medicamento: {} as FormMedicaments,
    quantidade: 0
    // adicionar valor inicial para cada propriedade
  }

  // function getFormattedDate() {
  //   const currentDate = new Date()
  //   const formattedDate = currentDate.toLocaleDateString('pt-BR', {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: '2-digit'
  //   })
  //   return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  // }

 
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
        console.log('RESPOSTA_MEDICAMENTOS', response)
      } catch (error) {
        console.error('Erro ao buscar medicamentos:', error)
      }
    }
    fetchMedicaments()
  }, [])

  function handleAddMedicaments(formula: FormMedicaments, event: { preventDefault: () => void }) {
    event.preventDefault()
    const newItem: FormMedicaments = {
      id: formula.id,
      formula: formula.formula || '',
      quantidade: formula.quantidade || 0,
      vencimento: formula.vencimento || ''
    }
    setTableItems([...tableItems, newItem])

    console.log('formula', formula)
   
    console.log('ITENS_TABELA', tableItems)
  }

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
        resetForm()
        setTableItems([])
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
                <FormControl w='20
                0px'>
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
                    name='medicamento'
                    options={itemList.map(item => item.formula)}
                    onChange={(selectedOption: string) => {
                      const option = itemList.find((item) => item.formula === selectedOption)                      
                      setFieldValue('medicamento', option)
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
                      setFieldValue('quantidade', Number(e.target.value))
                    }}
                  />
                </FormControl>

                <FormControl display='flex' alignItems='flex-end'>
                  <Button name="adicionar" onClick={(e) => handleAddMedicaments({...values.medicamento, quantidade: values.quantidade}, e)}>Adicionar</Button>
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