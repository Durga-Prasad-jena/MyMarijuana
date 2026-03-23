import AccountTab from "@/components/AccountTab";
import BlankCard from "@/components/BlankCard";
import PageContainer from "@/theme-components/container/PageContainer";
import { Grid, Divider } from "@mui/material";



const AccountSetting = () => {

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BlankCard>
            <Divider />
            <AccountTab/>
          </BlankCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AccountSetting;
