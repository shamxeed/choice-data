import {
  IoCashOutline,
  IoPrintOutline,
  IoTimeOutline,
  IoPeopleOutline,
  IoRefreshOutline,
  IoKeyOutline,
  IoWifiOutline,
  IoWalletOutline,
  IoRemoveCircleOutline,
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoPhonePortraitOutline,
  IoFlashOutline,
} from 'react-icons/io5';

import { colors } from '@/constants/themes';

const { primary } = colors;

export const btns = [
  {
    id: 1,
    title: 'Funding',
    icon: <IoCashOutline size={30} color={primary} />,
  },
  {
    id: 2,
    title: 'Refund',
    screen: '/admin/refund',
    icon: <IoRefreshOutline size={30} color={primary} />,
  },
  {
    id: 3,
    title: 'Withdraw',
    screen: '/admin/withdraw',
    icon: <IoRemoveCircleOutline size={30} color={primary} />,
  },
  {
    id: '33-3-d',
    title: 'Configs',
    screen: '/admin/configs',
    icon: <IoSettingsOutline size={30} color={primary} />,
  },
  {
    id: 7,
    isAdmin: true,
    title: 'Super Login',
    icon: <IoKeyOutline size={31} color={primary} />,
  },
  /*  {
    id: 4,
    title: 'Load E-Pins',
    screen: '/admin/load_pins',
    icon: <IoPrintOutline size={30} color={primary} />,
  }, */
  {
    id: '67s7s',
    title: 'Update Airtime',
    screen: '/admin/airtime',
    icon: <IoPhonePortraitOutline size={30} color={primary} />,
  },
  {
    id: 25,
    title: 'Plans',
    screen: '/admin/plans',
    icon: <IoFlashOutline size={30} color={primary} />,
  },
  {
    id: 5,
    title: 'Update / Create Plans',
    screen: '/admin/plans/update',
    icon: <IoWifiOutline size={30} color={primary} />,
  },
  {
    id: 6,
    title: 'Toggle Data Plans',
    screen: '/admin/plans/toggle',
    icon: <IoWifiOutline size={30} color={primary} />,
  },
  {
    id: '229wus',
    isAdmin: true,
    title: 'Account Settings',
    screen: '/admin/account/settings',
    icon: <IoPersonCircleOutline size={31} color={primary} />,
  },
  {
    id: '57687ghh',
    isAdmin: true,
    title: 'Delete Requests',
    screen: '/admin/account/delete/requests',
    icon: <IoPersonCircleOutline size={31} color={primary} />,
  },
  {
    id: 10,
    title: 'Data Transactions',
    screen: '/admin/transactions/providers',
    icon: <IoTimeOutline size={30} color={primary} />,
  },
  {
    id: 8,
    title: 'Users',
    screen: '/admin/users',
    icon: <IoPeopleOutline size={31} color={primary} />,
  },
  {
    id: 9,
    title: 'Users Transactions',
    screen: '/admin/transactions/users',
    icon: <IoTimeOutline size={30} color={primary} />,
  },
  {
    id: 9,
    title: 'Users Wallet Summary',
    screen: '/admin/transactions/wallet_summary',
    icon: <IoWalletOutline size={30} color={primary} />,
  },
];
