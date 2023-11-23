import { FormLabel } from '@chakra-ui/react';
import React from 'react';

const Label = ({ children }) => {
  return <FormLabel fontWeight={700}>{children}</FormLabel>;
};

export default Label;
