import { Grid } from "@mui/material";

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: any;
}

const Breadcrumb = ({ subtitle, items, title, children }: BreadCrumbType) => (
  <Grid
    container
    sx={{
      backgroundColor: "primary.light",
      // borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
      p: "30px 25px 20px",
      marginBottom: "30px",
      position: "relative",
      overflow: "hidden",
    }}
  >
  
  </Grid>
);

export default Breadcrumb;
