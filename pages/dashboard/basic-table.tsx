import { Box, Grid } from '@mui/material';

import Breadcrumb from '../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../src/theme-components/container/PageContainer';
import ParentCard from '../../src/theme-components/shared/ParentCard';
import Table2 from '../../src/theme-components/tables/Table2';
import Table3 from '../../src/theme-components/tables/Table3';
import Table1 from '../../src/theme-components/tables/Table1';
import Table4 from '../../src/theme-components/tables/Table4';
import Table5 from '../../src/theme-components/tables/Table5';
import AdminAuth from '../../src/components/admin/AdminAuth';
import AdminLayout from '../../src/components/admin/AdminLayout';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Basic Table',
  },
];

const BasicTable = () => (
    <AdminAuth><AdminLayout>
  <PageContainer>
    {/* breadcrumb */}
    <Breadcrumb title="Basic Table" items={BCrumb} />
    {/* end breadcrumb */}
    <ParentCard title="Basic Table">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box>
            <Table5 />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Table2 />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Table3 />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Table1 />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Table4 />
          </Box>
        </Grid>
      </Grid>
    </ParentCard>
  </PageContainer>
  </AdminLayout></AdminAuth>
);

export default BasicTable;
