import { Input, Select } from '@chakra-ui/react';

const MyInput = (props) => {
  return <Input size={'lg'} {...props} />;
};

export default MyInput;

export const MySelect = ({ children, ...props }) => {
  return (
    <Select size={'lg'} {...props}>
      {children}
    </Select>
  );
};
