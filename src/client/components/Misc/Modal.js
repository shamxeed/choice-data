import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  PinInput,
  PinInputField,
  HStack,
} from '@chakra-ui/react';

import { colors } from '@/constants/themes';

const { primary } = colors;

const defaultTitle = 'Transaction Confirmation';

const MyModal = ({ data: { isOpen, onClose, ...props }, withFooter }) => {
  const { title, body, text, txt, onChange, isLoading, btnProps } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent ml={5} mr={5}>
        <ModalHeader>{title || defaultTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {body || (
            <>
              <Text>
                You are about to {txt || 'purchase'}{' '}
                <em
                  style={{
                    fontStyle: 'normal',
                    fontWeight: 700,
                  }}
                >
                  {text}
                </em>
                . Are you sure you want to proceed with this?
              </Text>

              <Box
                mt={2}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Text fontWeight={700} mb={1}>
                  Transaction Pin
                </Text>
                <HStack>
                  <PinInput onChange={onChange} mask>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Box>
            </>
          )}
        </ModalBody>

        {withFooter && (
          <ModalFooter>
            {!isLoading && (
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
            )}
            <Button
              bg={primary}
              loadingText={'Processing...'}
              colorScheme={primary}
              isLoading={isLoading}
              {...btnProps}
            >
              Confirm
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
