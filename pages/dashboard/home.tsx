import React from 'react';
import AdminAuth from "../../src/components/admin/AdminAuth";
import AdminLayout from "../../src/components/admin/AdminLayout";
import { Box } from '@mui/material';


function DashboardHome() {
    return (
      <AdminAuth><AdminLayout>

        <Box>
          <p>This is an empty Page!</p>
        </Box>
      
      </AdminLayout></AdminAuth>
    )
}

export default DashboardHome;
