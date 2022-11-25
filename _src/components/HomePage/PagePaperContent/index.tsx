import { ReactNode } from 'react';
import { Paper } from '@mui/material';

interface Props {
  children: ReactNode;
}

const PagePaperContent = ({ children }: Props) => {
  return (
    <Paper
      elevation={1}
      sx={{
        mx: {
          xs: 2,
          md: 3,
        },
        color: 'rgba(0, 0, 0, 0.87)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minWidth: '0px',
        overflowWrap: 'break-word',
        backgroundClip: 'border-box',
        border: '0px solid rgba(0, 0, 0, 0.125)',
        borderRadius: '0.75rem',
        overflow: 'visible',
        padding: 2,
        marginTop: -8,
        marginBottom: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'saturate(200%) blur(30px)',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
      }}
    >
      {children}
    </Paper>
  );
};

export default PagePaperContent;
