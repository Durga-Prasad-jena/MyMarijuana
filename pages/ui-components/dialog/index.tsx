import { Grid } from '@mui/material';
import Breadcrumb from '../../../src/layouts/theme/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/theme-components/container/PageContainer';
import ParentCard from '../../../src/theme-components/shared/ParentCard';
import ChildCard from '../../../src/theme-components/shared/ChildCard';
import SimpleDialog from '../../../src/components/ui-theme-components/dialog/SimpleDialog';
import AlertDialog from '../../../src/components/ui-theme-components/dialog/AlertDialog';
import TransitionDialog from '../../../src/components/ui-theme-components/dialog/TransitionDialog';
import FormDialog from '../../../src/components/ui-theme-components/dialog/FormDialog';
import FullscreenDialog from '../../../src/components/ui-theme-components/dialog/FullscreenDialog';
import MaxWidthDialog from '../../../src/components/ui-theme-components/dialog/MaxWidthDialog';
import ScrollContentDialog from '../../../src/components/ui-theme-components/dialog/ScrollContentDialog';
import ResponsiveDialog from '../../../src/components/ui-theme-components/dialog/ResponsiveDialog';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Dialog',
  },
];

const MuiDialog = () => (
  <PageContainer>
    {/* breadcrumb */}
    <Breadcrumb title="Dialog" items={BCrumb} />
    {/* end breadcrumb */}

    <ParentCard title="Dialog">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Simple">
            <SimpleDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Alert">
            <AlertDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Transition">
            <TransitionDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Form">
            <FormDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Full screen">
            <FullscreenDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Max width">
            <MaxWidthDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Scrolling Content">
            <ScrollContentDialog />
          </ChildCard>
        </Grid>
        <Grid item xs={12} lg={4} sm={6} display="flex" alignItems="stretch">
          <ChildCard title="Responsive Fullscreen">
            <ResponsiveDialog />
          </ChildCard>
        </Grid>
      </Grid>
    </ParentCard>
  </PageContainer>
);
export default MuiDialog;
