import { Grid } from '@mui/material';
import Breadcrumb from '../../../src/layouts/theme/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/theme-components/container/PageContainer';
import ParentCard from '../../../src/theme-components/shared/ParentCard';
import ChildCard from '../../../src/theme-components/shared/ChildCard';
import ClickPopover from '../../../src/theme-components/ui-components/popover/ClickPopover';
import HoverPopover from '../../../src/theme-components/ui-components/popover/HoverPopover';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Popover',
  },
];

const MuiPopover = () => {
  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="Popover" items={BCrumb} />
      {/* end breadcrumb */}

      <ParentCard title="Popover">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Click">
              <ClickPopover />
            </ChildCard>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" alignItems="stretch">
            <ChildCard title="Hover">
              <HoverPopover />
            </ChildCard>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
}
export default MuiPopover;
