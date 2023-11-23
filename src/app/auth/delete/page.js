import Layout from '@/client/layouts/Layout';
import DeleteAccount from '@/client/components/auth/delete';

const Page = () => {
  return (
    <Layout noHeader>
      <DeleteAccount />
    </Layout>
  );
};

export default Page;
