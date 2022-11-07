export default {
  container: {
    display: 'flex',
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem',
    backdropFilter: 'saturate(200%) blur(30px)',
    background: 'rgba(255, 255, 255, 0.8)',
    py: 1,
    px: 1,
    gap: 1,
    borderRadios: 1,
  },
  tabs: {
    minHeight: 40,
    '& .MuiTab-root': {
      fontSize: '0.8125rem',
      padding: '4px 5px',
      minHeight: 40,
      '& .MuiSvgIcon-root': {
        userSelect: 'none',
        width: '1em',
        height: '1em',
        display: 'inline-block',
        fill: 'currentcolor',
        flexShrink: '0',
        transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        fontSize: 'inherit',
      },
    },
  }
};
