import { Box, Text, IconButton, Button } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { MdPhone, MdWhatsapp } from 'react-icons/md';
import { FiFacebook } from 'react-icons/fi';

import { colors } from '@/constants/themes';
import Heading from '@/client/layouts/Heading';

const { white, primary } = colors;

const MyIconBtn = (props) => (
  <IconButton
    borderRadius={'50%'}
    icon={<MdPhone size={25} color={primary} />}
    {...props}
  />
);

const Support = ({ support }) => {
  const { phone, whatsapp, social, whatsapp_group } = support || {};

  return (
    <Box
      bg={white}
      p={3}
      mb={3}
      borderRadius={10}
      width={['100%', '49.5%']}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      }}
    >
      <Heading>We're Always Here For You!</Heading>

      <Text>
        Ask a question or file a complaint againts transactions, manage request,
        make suggesstion, report an issues. Our support team will get back to
        you shortly.
      </Text>

      <Box m={2} mt={2.5}>
        <Text textAlign={'center'} mt={1.5} mb={2.5}>
          Contact Me Directly.
        </Text>

        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
        >
          <Link href={`tel:${phone}`}>
            <MyIconBtn />
          </Link>
          <Link href={`https://wa.me/+234${whatsapp}`} target={'_blank'}>
            <MyIconBtn icon={<MdWhatsapp size={25} color={primary} />} />
          </Link>

          <Link href={social} target={'_blank'}>
            <MyIconBtn icon={<FiFacebook size={25} color={primary} />} />
          </Link>
        </Box>

        <Text textAlign={'center'} mt={1.5}>
          Or
        </Text>
      </Box>

      <Box m={2}>
        <Link href={whatsapp_group} target={'_blank'}>
          <Button
            size={'lg'}
            bg={primary}
            width={'100%'}
            borderRadius={5}
            colorScheme={primary}
            rightIcon={<MdWhatsapp size={20} />}
          >
            Join Our WhatsApp Group
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Support;
