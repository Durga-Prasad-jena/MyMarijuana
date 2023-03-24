import { Grid } from '@mui/material';
import PageContainer from '../../../../src/theme-components/container/PageContainer';
import ProfileBanner from '../../../../src/theme-components/apps/userprofile/profile/ProfileBanner';
import GalleryCard from '../../../../src/theme-components/apps/userprofile/gallery/GalleryCard';


const Gallery = () => {
  return (
    <PageContainer>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner />
        </Grid>
        <Grid item sm={12}>
          <GalleryCard />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Gallery;
