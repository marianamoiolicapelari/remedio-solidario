import {
  Modal as ModalChakra,
  ModalProps as ModalPropsChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"

interface ModalProps extends ModalPropsChakra {
  modalFooter?: React.ReactNode
  modalHeaderText?: string
}
const BaseModal = ({
  children,
  isOpen,
  onClose,
  modalHeaderText,
  modalFooter,
  ...rest
}: ModalProps) => {
  return (
    <ModalChakra isOpen={isOpen} onClose={onClose} isCentered {...rest} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color='#247ba0' textAlign={"center"}>
          {modalHeaderText}
        </ModalHeader>
        <ModalCloseButton color='#247ba0' />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{modalFooter}</ModalFooter>
      </ModalContent>
    </ModalChakra>
  )
}

export default BaseModal