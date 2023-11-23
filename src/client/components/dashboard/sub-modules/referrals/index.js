'use client';

import SubHeader from '../../../../layouts/SubHeader';
import MainBox from '../../../../layouts/MainBox';
import Container from '../../../Misc/Container';
import MyTable from './Table';

const MyReferrals = () => {
  return (
    <MainBox>
      <SubHeader title={'MY REFERRALS'} />

      <Container>
        <MyTable />
      </Container>
    </MainBox>
  );
};

export default MyReferrals;
