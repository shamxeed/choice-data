import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IoRefreshOutline } from 'react-icons/io5';
import { colors } from '@/constants/themes';
import { IconBtn } from '../../Misc/btns';

const { white } = colors;

const btnSize = 20;

const Eye = <FiEye size={btnSize} color={white} />;
const EyeOff = <FiEyeOff size={btnSize} color={white} />;
const RefreshIcon = <IoRefreshOutline size={btnSize} color={white} />;

const ShowBalBtn = ({ data: { show, toggleBal } }) => {
  return <IconBtn size={'sm'} icon={show ? EyeOff : Eye} onClick={toggleBal} />;
};

export const ReloadBtn = (props) => {
  return <IconBtn size={'sm'} icon={RefreshIcon} {...props} />;
};

export default ShowBalBtn;
