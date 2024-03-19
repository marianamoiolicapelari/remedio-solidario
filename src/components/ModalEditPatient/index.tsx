import { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

interface FormData {
  id: number
  cpf: string
  fullName: string
  address: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (editedPatient: FormData) => void
  patient: FormData | null
}

const EditPatientModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, patient }) => {
  const [editedPatient, setEditedPatient] = useState<FormData | null>(patient)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    if (editedPatient) {
      setEditedPatient({ ...editedPatient, [field]: e.target.value })
    }
  };

  const handleSubmit = () => {
    if (editedPatient) {
      onSubmit(editedPatient)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Paciente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>CPF</FormLabel>
            <Input value={editedPatient?.cpf} onChange={(e) => handleChange(e, 'cpf')} />
          </FormControl>
          <FormControl>
            <FormLabel>Nome Paciente</FormLabel>
            <Input value={editedPatient?.fullName} onChange={(e) => handleChange(e, 'fullName')} />
          </FormControl>
          <FormControl>
            <FormLabel>Endereço</FormLabel>
            <Input value={editedPatient?.address} onChange={(e) => handleChange(e, 'address')} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Salvar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditPatientModal
