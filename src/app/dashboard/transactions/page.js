'use client';

import TransactionHistory from '@/client/components/dashboard/sub-modules/transactions';
import Layout from '@/client/layouts/Layout';

const Page = () => {
  return (
    <Layout>
      <TransactionHistory />
    </Layout>
  );
};

export default Page;
