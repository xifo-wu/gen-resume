export default {
  wrap: {
    position: 'relative',
    '& .toolbar': {
      display: 'none',
    },
    '&:hover': {
      '& .toolbar': {
        display: 'block',
      },

      '&:before': {
        position: 'absolute',
        content: '" "',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.35)',
      },
    },
  },
  toolbar: {
    position: 'absolute',
    zIndex: 99,
    right: 0,
    p: 1,
  },
};
