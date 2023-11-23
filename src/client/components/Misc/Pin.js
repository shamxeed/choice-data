import { Box } from '@chakra-ui/react';

import { CopyBtn } from './btns';

export const Pin = ({ pin }) => {
  return (
    <Box>
      <b>{pin}</b>
      <CopyBtn text={pin} />
    </Box>
  );
};
