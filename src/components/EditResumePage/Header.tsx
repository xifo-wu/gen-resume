// material-ui
import { Toolbar, AppBar, Avatar, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import useUser from '@/hooks/useUser';

// project imports
import LogoSection from '../LogoSection';

// Styles
import styles from './HeaderStyles';

interface Props {
  leftDrawerOpened?: boolean;
  rightDrawerOpened?: boolean;
  onLeftDrawerToggle: () => void;
  onRightDrawerToggle: () => void;
}

const Header = ({
  onLeftDrawerToggle,
  rightDrawerOpened,
  leftDrawerOpened,
  onRightDrawerToggle,
}: Props) => {
  const theme = useTheme();
  const { user = {} } = useUser();

  console.log(user, 'user', theme.transitions.create('width'));

  return (
    <AppBar
      enableColorOnDark
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.default,
        transition:
          leftDrawerOpened || rightDrawerOpened ? theme.transitions.create('width') : 'none',
      }}
    >
      <Toolbar>
        <Box sx={styles.logoAndTogglerButton}>
          <Box component="span" sx={styles.logo}>
            <LogoSection />
          </Box>
          <IconButton color="secondary" onClick={onLeftDrawerToggle} sx={styles.togglerButton}>
            {leftDrawerOpened ? <FormatIndentDecreaseIcon /> : <FormatIndentIncreaseIcon />}
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="secondary" onClick={onRightDrawerToggle} sx={styles.togglerButton}>
            {rightDrawerOpened ? <FormatIndentIncreaseIcon /> : <FormatIndentDecreaseIcon />}
          </IconButton>
          <Avatar alt={user.username} variant="circular" src={user.gravatar} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
