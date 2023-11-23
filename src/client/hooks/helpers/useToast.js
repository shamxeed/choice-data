import { useToast as useT } from '@chakra-ui/react';

export const useToast = () => {
  const toast = useT();

  const success = ({ title, description }) =>
    toast({
      title: title || 'Success!',
      description,
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });

  const error = ({ title, description }) =>
    toast({
      title: title || 'An Error Occured!',
      description,
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });

  const info = ({ title, description }) =>
    toast({
      title: title,
      description,
      status: 'info',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });

  return {
    success,
    error,
    info,
  };
};

export default useToast;
