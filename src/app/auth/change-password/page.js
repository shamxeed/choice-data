import Layout from '@/client/layouts/Layout';
import ChangePassword from '@/client/components/auth/change-password';

const Page = () => {
  return (
    <Layout noHeader>
      <ChangePassword />
    </Layout>
  );
};

export default Page;
