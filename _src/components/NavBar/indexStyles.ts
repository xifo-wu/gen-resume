export default {
  container: {
    position: 'sticky',
    top: 0,
    zIndex: 99,
  },
  contentBox: {
    py: 1,
    my: 2,
    mx: 3,
    width: 'calc(100% - 48px)',
    position: 'absolute',
    left: 0,
    zIndex: 3,
    opacity: 1,
    background: 'rgba(255, 255, 255, 0.8)',
    color: 'rgb(52, 71, 103)',
    borderRadius: '0.75rem',
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem',
    backdropFilter: 'saturate(200%) blur(30px)',
    px: {
      xs: 3,
      sm: 3,
      md: 2,
    },
  },
  logoBox: {
    width: 128,
    display: 'flex',
    alignItems: 'center',
  },
  avatarBox: {
    display: { xs: 'none', md: 'block' },
  },
  avatarIcon: {
    display: 'block',
    cursor: 'pointer',
  },
};
