import { useMediaQuery, Box, Drawer, Container, Theme } from '@mui/material';
import NavListing from './NavListing/NavListing';
import Logo from '../../shared/logo/Logo';
import { useSelector, useDispatch } from '../../../../../store/Store';
import { toggleMobileSidebar } from '../../../../../store/theme.slice';
import SidebarItems from '../../vertical/sidebar/SidebarItems';
import { AppState } from '../../../../../store/Store';
import { MenuitemsType } from '../../vertical/sidebar/MenuItems';

interface Props {
  menuItems?: MenuitemsType[]
}

const Navigation: React.FC<Props> = ({ menuItems }) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  if (lgUp) {
    return (
      <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} py={2}>
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          <NavListing menuItems={menuItems} />
        </Container>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() => dispatch(toggleMobileSidebar())}
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          border: '0 !important',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems menuItems={menuItems} />
    </Drawer>
  );
};

export default Navigation;
