import React from 'react';

import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
} from '@chakra-ui/react';

import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoInformationCircleOutline,
} from 'react-icons/io5';

import { colors } from '@/constants/themes';

const { primary, blue, red } = colors;

const errorIcon = <IoCloseCircleOutline size={80} color={red} />;
const infoIcon = <IoInformationCircleOutline size={80} color={blue} />;
const successIcon = <IoCheckmarkCircleOutline size={80} color={primary} />;

const Alert = ({ data }) => {
  const cancelRef = React.useRef();

  const { isOpen, onClose, title, body, myBody, btn, ...props } = data;

  const { btnText, type, onClick } = props;

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent ml={3} mr={3}>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={5}
          >
            {type === 'success'
              ? successIcon
              : type === 'info'
              ? infoIcon
              : errorIcon}
          </Box>
          <AlertDialogHeader
            fontSize='lg'
            fontWeight='bold'
            textAlign={'center'}
          >
            {title || 'An Error Occured'}
          </AlertDialogHeader>

          {myBody || (
            <AlertDialogBody textAlign={'center'}>{body}</AlertDialogBody>
          )}

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>

            {btnText && (
              <Button colorScheme='red' onClick={onClick} ml={3}>
                {btnText}
              </Button>
            )}

            {btn && btn}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
