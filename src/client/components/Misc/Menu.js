import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';
import { useRouter } from 'next/navigation';

import { menuOpts } from '@/constants/Data';
import { colors } from '@/constants/themes';
import { useAuth } from '@/client/hooks/helpers';
import MyModal from './Modal';
import TransactionPinInputs from './TransactionPinInputs';

const { primary } = colors;

const MyMenu = () => {
  const router = useRouter();

  const { logOut, user } = useAuth();

  const { onOpen, ...props } = useDisclosure();

  const { transaction_pin, is_email_verified, is_nin_verified } = user || {};

  const title = transaction_pin
    ? 'Change Transaction Pin'
    : 'Set Transaction Pin';

  const handleClick = (title) => {
    if (title === 'Log Out') {
      logOut();
    } else if (title === 'My Email') {
      if (!is_email_verified) {
        router.push('/auth/verify-email');
      }
    } else if (title === 'My NIN') {
      if (!is_nin_verified) {
        router.push('/auth/verify-nin');
      }
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<MdAccountCircle size={25} color={primary} />}
        />
        <MenuList>
          {menuOpts.map(({ title, icon, id }) => (
            <MenuItem icon={icon} key={id} onClick={() => handleClick(title)}>
              {title}{' '}
              {title === 'My Email' && (
                <em
                  style={{
                    fontSize: 14,
                    color: is_email_verified ? primary : 'red',
                  }}
                >
                  {is_email_verified ? 'Verified 👌' : 'Click to verify'}
                </em>
              )}
              {title === 'My NIN' && (
                <em
                  style={{
                    fontSize: 14,
                    color: is_nin_verified ? primary : 'red',
                  }}
                >
                  {is_nin_verified ? 'Verified 👌' : 'Click to verify'}
                </em>
              )}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <MyModal
        data={{
          title,
          ...props,
          body: <TransactionPinInputs data={{ ...props }} />,
        }}
      />
    </>
  );
};

export default MyMenu;
