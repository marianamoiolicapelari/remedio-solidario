import { Box, Button, Flex, FormControl, FormLabel, Select, Text } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import { Footer, Header } from '../../components'
// import * as Yup from 'yup'
// import { toast } from 'react-toastify'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'

interface FormData {
  id: string
  fullName: string
}

const Dispensation = () => {
  const [patients, setPatients] = useState<FormData[]>([])

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
        <Text fontWeight="bold" fontSize='xl'>Dispensação de Medicamentos</Text>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
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
                  autoFocus
                >
                  {patients && patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.fullName}</option>
                  ))}
                </Select>
                {errors.fullName && touched.fullName && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.fullName}</Text>}
              </FormControl>

              <Flex justify={'flex-end'}>
                <Button mt={14} variant='outline' type='submit' colorScheme='blue' width='20%'>Cadastrar</Button>
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