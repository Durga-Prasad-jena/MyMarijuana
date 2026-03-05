import { Box } from "@mui/material";

import PageContainer from "@/theme-components/container/PageContainer";
import Welcome from "@/layouts/theme/full/shared/welcome/Welcome";

const Modern = () => {
  return (
    <PageContainer>
      <Box>
       
        {/* column */}
        <Welcome />
      </Box>
    </PageContainer>
  );
};

export default Modern;
