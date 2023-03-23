import { Grid } from '@mui/material';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/theme-components/container/PageContainer';
import YearlyBreakup from '../../../src/theme-components/dashboards/modern/YearlyBreakup';
import Projects from '../../../src/theme-components/dashboards/modern/Projects';
import Customers from '../../../src/theme-components/dashboards/modern/Customers';
import TotalEarning from '../../../src/theme-components/dashboards/ecommerce/TotalEarning';
import MonthlyEarnings from '../../../src/theme-components/dashboards/ecommerce/MonthlyEarnings';
import SalesOverview from '../../../src/theme-components/dashboards/ecommerce/SalesOverview';
import RevenueUpdates from '../../../src/theme-components/dashboards/ecommerce/RevenueUpdates';
import YearlySales from '../../../src/theme-components/dashboards/ecommerce/YearlySales';
import MostVisited from '../../../src/theme-components/widgets/charts/MostVisited';
import PageImpressions from '../../../src/theme-components/widgets/charts/PageImpressions';
import Followers from '../../../src/theme-components/widgets/charts/Followers';
import Views from '../../../src/theme-components/widgets/charts/Views';
import Earned from '../../../src/theme-components/widgets/charts/Earned';
import CurrentValue from '../../../src/theme-components/widgets/charts/CurrentValue';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Charts',
  },
];

const WidgetCharts = () => {
  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="Charts" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Followers />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Views />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Earned />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12}>
          <CurrentValue />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <YearlyBreakup />
            </Grid>
            <Grid item xs={12}>
              <MonthlyEarnings />
            </Grid>
            <Grid item xs={12}>
              <MostVisited />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <YearlySales />
            </Grid>
            <Grid item xs={12}>
              <PageImpressions />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Customers />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Projects />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <RevenueUpdates />
            </Grid>
            <Grid item xs={12}>
              <SalesOverview />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default WidgetCharts;
