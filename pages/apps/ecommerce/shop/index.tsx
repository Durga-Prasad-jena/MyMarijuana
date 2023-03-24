import React from 'react';
import { Box } from '@mui/material';
import Breadcrumb from '../../../../src/layouts/theme/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../src/theme-components/container/PageContainer';
import ProductList from '../../../../src/theme-components/apps/ecommerce/productGrid/ProductList';
import ProductSidebar from '../../../../src/theme-components/apps/ecommerce/productGrid/ProductSidebar';
import AppCard from '../../../../src/theme-components/shared/AppCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Shop',
  },
];
const Ecommerce = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(true);

  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="Ecom-Shop" items={BCrumb} />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
        <ProductSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={3} flexGrow={1}>
          <ProductList onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Ecommerce;
