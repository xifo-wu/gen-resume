import { Theme, SxProps } from '@mui/material';

export default {
  containerSX: (theme: Theme, sx: SxProps<Theme> | undefined): any => ({
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    ...sx,
  }),
  backgroundBoxSX: (src: string) => ({
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${src})`,
  }),
  overlayBottomSX: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 60%, black 90%)',
  },
};
