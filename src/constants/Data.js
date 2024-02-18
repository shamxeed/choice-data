import {
  MdDashboard,
  MdPhoneAndroid,
  MdWallet,
  MdHistory,
  MdWifi,
  MdLogout,
  MdKey,
  MdOutlineSubscriptions,
  MdLockPerson,
  MdLightbulb,
  MdPerson,
  MdPrint,
  MdSchool,
  MdSubscriptions,
  MdRefresh,
  MdOutlineVerifiedUser,
} from 'react-icons/md';

import {
  IoPhonePortraitOutline,
  IoBulbOutline,
  IoPrintOutline,
  IoTimeOutline,
  IoWifiOutline,
  IoChatbubblesOutline,
  IoSchoolOutline,
  IoPeopleOutline,
} from 'react-icons/io5';

import { BiTransferAlt } from 'react-icons/bi';

import { colors } from './themes';

const { gray, primary } = colors;

export const drawerOpts = [
  {
    id: '1a',
    title: 'Dashboard',
    screen: '/dashboard',
    icon: <MdDashboard size={20} color={gray} />,
  },
  {
    id: '2b',
    title: 'Buy Data',
    screen: '/dashboard/data',
    icon: <MdWifi size={20} color={gray} />,
  },
  {
    id: '3b',
    title: 'Buy Airtime',
    screen: '/dashboard/airtime',
    icon: <MdPhoneAndroid size={20} color={gray} />,
  },
  {
    id: '12b',
    title: 'Data Card',
    screen: '/dashboard/data-card',
    icon: <MdPrint size={20} color={gray} />,
  },
  {
    id: '3c',
    title: 'Education',
    screen: '/dashboard/education',
    icon: <MdSchool size={20} color={gray} />,
  },
  {
    id: '23b',
    title: 'Cable Subs',
    screen: '/dashboard/cable',
    icon: <MdSubscriptions size={20} color={gray} />,
  },
  {
    id: '45b',
    title: 'Electricity',
    screen: '/dashboard/electricity',
    icon: <MdLightbulb size={20} color={gray} />,
  },
  {
    id: '4c',
    title: 'Fund Wallet',
    screen: '/dashboard/wallet/fund',
    icon: <MdWallet size={20} color={gray} />,
  },
  {
    id: '5d',
    title: 'Transaction History',
    screen: '/dashboard/transactions',
    icon: <MdHistory size={20} color={gray} />,
  },
  {
    id: '5110',
    title: 'Transfer Bonus',
    screen: '/dashboard/transfer-bonus',
    icon: <BiTransferAlt size={20} color={gray} />,
  },
  {
    id: '7f',
    title: 'Admin Panel',
    isAdmin: true,
    screen: '/admin',
    icon: <MdLockPerson size={20} color={gray} />,
  },
];

export const menuOpts = [
  {
    id: '1a',
    title: 'My Email',
    icon: <MdPerson size={20} color={gray} />,
  },
  {
    id: '4r',
    title: 'My NIN',
    icon: <MdOutlineVerifiedUser size={20} color={gray} />,
  },
  {
    id: '2b',
    title: 'Transaction Pin',
    icon: <MdKey size={20} color={gray} />,
    screen: '/transaction_pin',
  },
  {
    id: '3c',
    title: 'Log Out',
    icon: <MdLogout size={20} color={gray} />,
  },
];

export const dashBtnsOpts = [
  {
    id: '1a',
    title: 'Buy Data',
    screen: '/dashboard/data',
    icon: <IoWifiOutline size={32} color={primary} />,
  },
  {
    id: '2b',
    title: 'Buy Airtime',
    screen: '/dashboard/airtime',
    icon: <IoPhonePortraitOutline size={30} color={primary} />,
  },
  {
    id: '12b',
    title: 'Data Card',
    screen: '/dashboard/data-card',
    icon: <IoPrintOutline size={30} color={primary} />,
  },
  {
    id: '3c',
    title: 'Education',
    screen: '/dashboard/education',
    icon: <IoSchoolOutline size={30} color={primary} />,
  },
  {
    id: '23b',
    title: 'Cable Subs',
    screen: '/dashboard/cable',
    icon: <MdOutlineSubscriptions size={30} color={primary} />,
  },
  {
    id: '22b',
    title: 'Electricity',
    screen: '/dashboard/electricity',
    icon: <IoBulbOutline size={30} color={primary} />,
  },
  {
    id: '5e',
    title: 'Transaction History',
    screen: '/dashboard/transactions',
    icon: <IoTimeOutline size={30} color={primary} />,
  },
  {
    id: '6f',
    title: 'My Referrals',
    screen: '/dashboard/referrals',
    icon: <IoPeopleOutline size={33} color={primary} />,
  },
  {
    id: '5110',
    title: 'Transfer Bonus',
    screen: '/dashboard/transfer-bonus',
    icon: <BiTransferAlt size={30} color={primary} />,
  },
];
