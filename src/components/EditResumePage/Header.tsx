// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';

// project imports
import LogoSection from '../LogoSection';

interface Props {
  leftDrawerOpened?: boolean;
  onLeftDrawerToggle: () => void;
}

const Header = ({ onLeftDrawerToggle, leftDrawerOpened }: Props) => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 256,
          px: 0,
          pt: 1,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection animation="heartBeat" />
        </Box>
        <IconButton
          color="primary"
          onClick={onLeftDrawerToggle}
          sx={{
            ml: {
              xs: 0,
              md: 3,
            },
          }}
        >
          {leftDrawerOpened ? <FormatIndentDecreaseIcon /> : <FormatIndentIncreaseIcon />}
        </IconButton>
      </Box>
    </>
  );
};

export default Header;
