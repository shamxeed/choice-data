import Layouts from '../client/layouts/Layout';
import SignIn from '@/client/components/auth/sign-in';

export default function Home() {
  return (
    <Layouts noHeader>
      <SignIn />
    </Layouts>
  );
}
