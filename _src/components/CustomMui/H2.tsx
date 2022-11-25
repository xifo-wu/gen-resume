import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';

export interface H2Props extends TypographyProps {}

const H2 = (props: H2Props) => {
  const { children, sx, ...rest } = props;

  return (
    <Typography
      variant="h2"
      sx={{
        fontSize: '1.875rem',
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: 2,
        fontFamily: 'Public Sans,sans-serif',
        color: '#fff',
        '@media (min-width: 600px)': {
          fontSize: '2.5rem',
        },
        '@media (min-width: 900px)': {
          fontSize: '2.625rem',
        },
        '@media (min-width: 1200px)': {
          fontSize: '3rem',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default H2;
