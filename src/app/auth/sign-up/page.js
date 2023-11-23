import Layout from '@/client/layouts/Layout';
import SignUp from '@/client/components/auth/sign-up';

const Page = () => {
  return (
    <Layout noHeader>
      <SignUp />
    </Layout>
  );
};

export default Page;
