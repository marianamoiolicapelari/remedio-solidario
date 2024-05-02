import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { Footer, Header } from '../../components'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { api } from '../../services/api'
import { toast } from 'react-toastify'

interface FormData {
  id: number
  formula: string
  quantidade: number
  vencimento: string
}

const Medicament = () => {
  const initialValues: FormData = {
    id: 0,
    formula: '',
    quantidade: 0,
    vencimento: ''
  }

  const validationSchema = Yup.object({
    formula: Yup.string().required('Nome do medicamento é obrigatório'),
    quantidade: Yup.number().required('A quantidade é obrigatória'),
    vencimento: Yup.string().required('Data de vencimento é obrigatória'),
  })

  const handleSubmitForm = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
 
    try {
      const { status } = await api.post('/medicamento', values, {
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
                <FormLabel htmlFor='formula' color='#808080'>Medicamento</FormLabel>
                <Field
                  as={Input}
                  id='formula'
                  name='formula'
                  type='text'
                  placeholder='Digite o nome do medicamento'
                  autoFocus
                />
                {errors.formula && touched.formula && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.formula}</Text>}
              </FormControl>

              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='quantidade' color='#808080'>Quantidade</FormLabel>
                <Field as={Input} id='quantidade' name='quantidade' type='number' placeholder='Digite a quantidade' width='30%'/>
                {errors.quantidade && touched.quantidade && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.quantidade}</Text>}
              </FormControl>

              <FormControl mt={7} h='80px'>
                <FormLabel htmlFor='vencimento' color='#808080'>Data do vencimento</FormLabel>
                <Field as={Input} id='vencimento' name='vencimento' type='date' width='30%'/>
                {errors.vencimento && touched.vencimento && <Text color='#ff0000' fontSize={14} fontWeight='500' pl={1}>{errors.vencimento}</Text>}
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