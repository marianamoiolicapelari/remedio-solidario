import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { Footer, Header } from '../../components'
import { Formik, Field, Form } from 'formik'

type Props = {
  cpf: string
  fullName: string
  address: string
}

interface FormData {
  cpf: string
  fullName: string
  address: string
}

const Paciente: React.FC<Props> = () => {
  const initialValues: FormData = {
    cpf: '',
    fullName: '',
    address: ''
  }

  const handleSubmitForm = (values: FormData) => {
    const formData = new FormData()

    formData.append('cpf', values.cpf || '')
    formData.append('fullName', values.fullName || '')
    formData.append('address', values.address || '')

    console.log('Dados enviados', values)
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
          onSubmit={handleSubmitForm}
        >
          <Form>
            <FormControl pt={7}>
              <FormLabel htmlFor='cpf' color='#808080'>CPF do paciente</FormLabel>
              <Field as={Input} id='cpf' name='cpf' type='text' placeholder='Digite o CPF' width='30%' />
            </FormControl>

            <FormControl pt={7}>
              <FormLabel htmlFor='fullName' color='#808080'>Nome do paciente</FormLabel>
              <Field as={Input} id='fullName' name='fullName' type='text' placeholder='Digite o nome completo' />
            </FormControl>

            <FormControl pt={7}>
              <FormLabel htmlFor='address' color='#808080'>Endereço do paciente</FormLabel>
              <Field as={Input} id='address' name='address' type='text' placeholder='Digite o endereço completo' />
            </FormControl>

            <Flex justify={'flex-end'}>
              <Button mt={20} variant='outline' type='submit' colorScheme='blue' width='20%'>Cadastrar</Button>
            </Flex>
          </Form>

        </Formik>
      </Box>
      <Footer />
    </>
  )
}

export default Paciente