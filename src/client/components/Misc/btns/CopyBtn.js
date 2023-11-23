import { useToast } from '@/client/hooks/helpers';
import IconBtn from './IconBtn';

const CopyBtn = ({ text }) => {
  const { success } = useToast();

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(text);

    success({ description: 'Copied to clipboard' });
  };
  return <IconBtn onClick={copyToClipBoard} isPrimary />;
};

export default CopyBtn;
