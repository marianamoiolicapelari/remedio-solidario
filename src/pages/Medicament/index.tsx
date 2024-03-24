import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { Footer, Header } from '../../components'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { api } from '../../services/api'
import { toast } from 'react-toastify'

interface FormData {
  medicament: string
  quantity: string
  expirationDate: string
}

const Medicament = () => {
  const initialValues: FormData = {
    medicament: '',
    quantity: '',
    expirationDate: ''
  }

  const validationSchema = Yup.object({
    medicament: Yup.string().required('Nome do medicamento é obrigatório'),
    quantity: Yup.string().required('A quantidade é obrigatória'),
    expirationDate: Yup.string().required('Data de vencimento é obrigatória'),
  });

  const handleSubmitForm = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    // const formData = new FormData()
    // formData.append('cpf', values.cpf)
    // formData.append('fullName', values.fullName)
    // formData.append('address', values.address)

    try {
      const { status } = await api.post('/medicaments', values, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (status === 201 || status === 200) {
        toast.success('Medicamento cadastrado com sucesso!')
        resetForm()
      }
      if (status === 409) {
        toast.error('Medicamento já cadastrado')
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
        <Text fontWeight="bold" fontSize='xl'>Cadastro de Medicamentos</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='medicament' color='#808080'>Medicamento</FormLabel>
                <Field
                  as={Input}
                  id='medicament'
                  name='medicament'
                  type='text'
                  placeholder='Digite o nome do medicamento'
                  autoFocus
                />
                {errors.medicament && touched.medicament && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.medicament}</Text>}
              </FormControl>

              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='quantity' color='#808080'>Quantidade</FormLabel>
                <Field as={Input} id='quantity' name='quantity' type='text' placeholder='Digite a quantidade' width='30%'/>
                {errors.quantity && touched.quantity && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.quantity}</Text>}
              </FormControl>

              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='expirationDate' color='#808080'>Data do vencimento</FormLabel>
                <Field as={Input} id='expirationDate' name='expirationDate' type='date' width='30%'/>
                {errors.expirationDate && touched.expirationDate && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.expirationDate}</Text>}
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

export default Medicament