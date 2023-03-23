import { Grid } from '@mui/material';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/theme-components/container/PageContainer';

import PaymentGateways from '../../../src/theme-components/dashboards/ecommerce/PaymentGateways';
import RecentTransactions from '../../../src/theme-components/dashboards/ecommerce/RecentTransactions';
import TopCards from '../../../src/theme-components/dashboards/modern/TopCards';
import UpcomingAcitivity from '../../../src/theme-components/widgets/cards/UpcomingActivity';
import ComplexCard from '../../../src/theme-components/widgets/cards/ComplexCard';
import MusicCard from '../../../src/theme-components/widgets/cards/MusicCard';
import EcommerceCard from '../../../src/theme-components/widgets/cards/EcommerceCard';
import FollowerCard from '../../../src/theme-components/widgets/cards/FollowerCard';
import FriendCard from '../../../src/theme-components/widgets/cards/FriendCard';
import ProfileCard from '../../../src/theme-components/widgets/cards/ProfileCard';

import Settings from '../../../src/theme-components/widgets/cards/Settings';
import GiftCard from '../../../src/theme-components/widgets/cards/GiftCard';


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Cards',
  },
];

const WidgetCards = () => {
  return (
    <PageContainer>
    {/* breadcrumb */}
    <Breadcrumb title="Cards" items={BCrumb} />
    {/* end breadcrumb */}
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TopCards />
      </Grid>
      <Grid item xs={12}>
        <ComplexCard />
      </Grid>
      <Grid item xs={12}>
        <EcommerceCard />
      </Grid>
      <Grid item xs={12}>
        <MusicCard />
      </Grid>
      <Grid item xs={12}>
        <FollowerCard />
      </Grid>
      <Grid item xs={12}>
        <FriendCard />
      </Grid>
      <Grid item xs={12}>
        <ProfileCard />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Settings />
      </Grid>
      <Grid item xs={12} lg={8}>
        <GiftCard />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <PaymentGateways />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <UpcomingAcitivity />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <RecentTransactions />
      </Grid>
    </Grid>
    </PageContainer>
  );
};

export default WidgetCards;
