import { IconButton } from '@chakra-ui/react';
import { IoCopyOutline } from 'react-icons/io5';

import { colors } from '@/constants/themes';

const { white, primary } = colors;

const IconBtn = ({ isPrimary, ...props }) => (
  <IconButton
    size={'xs'}
    color={white}
    variant={'outline'}
    colorScheme={primary}
    icon={<IoCopyOutline size={15} color={isPrimary ? primary : white} />}
    {...props}
  />
);

export default IconBtn;
