import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { Footer, Header } from '../../components'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { api } from '../../services/api'
import { toast } from 'react-toastify'

interface FormData {
  cpf: string
  fullName: string
  address: string
}

const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

const validateCPF = (cpf: string) => {
  const regex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/

  if (!regex.test(cpf)) {
    return false
  }
  return true
}

const Patient = () => {
  const initialValues: FormData = {
    cpf: '',
    fullName: '',
    address: ''
  }

  const validationSchema = Yup.object({
    cpf: Yup.string().required('CPF é obrigatório').test('cpf', 'CPF inválido', validateCPF),
    fullName: Yup.string().required('Nome é obrigatório').matches(/^[^\d]+$/, 'Nome não pode conter números'),
    address: Yup.string().required('Endereço é obrigatório'),
  })

  const handleSubmitForm = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    // const formData = new FormData()
    // formData.append('cpf', values.cpf)
    // formData.append('fullName', values.fullName)
    // formData.append('address', values.address)

    try {
      const { status } = await api.post('/patients', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (status === 201 || status === 200) {
        toast.success('Paciente cadastrado com sucesso!')
        resetForm()
      }
      if (status === 409) {
        toast.error('Paciente já cadastrado')
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
        <Text fontWeight="bold" fontSize='xl'>Cadastro de Paciente</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({ errors, setFieldValue, values, touched }) => (
            <Form>
              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='cpf' color='#808080'>CPF do paciente</FormLabel>
                <Field
                  as={Input}
                  id='cpf'
                  name='cpf'
                  type='text'
                  placeholder='Digite o CPF'
                  width='30%'
                  onChange={(e: { target: { value: string } }) => {
                    const maskedCPF = maskCPF(e.target.value)
                    setFieldValue('cpf', maskedCPF)
                  }}
                  value={values.cpf}
                  autoFocus
                />
                {errors.cpf && touched.cpf && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.cpf}</Text>}
              </FormControl>

              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='fullName' color='#808080'>Nome do paciente</FormLabel>
                <Field as={Input} id='fullName' name='fullName' type='text' placeholder='Digite o nome completo' />
                {errors.fullName && touched.fullName && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.fullName}</Text>}
              </FormControl>

              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='address' color='#808080'>Endereço do paciente</FormLabel>
                <Field as={Input} id='address' name='address' type='text' placeholder='Digite o endereço completo' />
                {errors.address && touched.address && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.address}</Text>}
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

export default Patient