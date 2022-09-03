import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';

export interface H1Props extends TypographyProps {}

const H1 = (props: H1Props) => {
  const { children, sx, ...rest } = props;

  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: 2,
        fontFamily: 'Public Sans,sans-serif',
        color: '#fff',
        '@media (min-width: 600px)': {
          fontSize: '3.25rem',
        },
        '@media (min-width: 900px)': {
          fontSize: '3.625rem',
        },
        '@media (min-width: 1200px)': {
          fontSize: '4rem',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default H1;
