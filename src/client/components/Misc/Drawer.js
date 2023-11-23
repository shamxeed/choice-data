import { useRouter } from 'next/navigation';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { drawerOpts } from '@/constants/Data';

const MyDrawer = ({ data }) => {
  const router = useRouter();

  const { isOpen, onClose, btnRef, user, title } = data || {};

  const { role } = user || {};

  const options = drawerOpts.filter(
    (i) =>
      !i.isAdmin || (i.isAdmin && (role === 'Admin' || role === 'MODERATOR'))
  );

  const handleClick = (screen, title) => {
    if (title === 'Dashboard') {
      onClose();
    }

    router.push(screen);
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader pl={4}>
            {title ? `Hi, ${title}!` : 'Loading...'}
          </DrawerHeader>

          <DrawerBody p={0} ml={-2.5}>
            {options.map(({ title, icon, screen, id }) => (
              <Button
                key={id}
                w={'100%'}
                size={'lg'}
                leftIcon={icon}
                textAlign={'left'}
                bg={'transparent'}
                display={'flex'}
                justifyContent={'flex-start'}
                onClick={() => handleClick(screen, title)}
              >
                {title}
              </Button>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MyDrawer;
