export default {
  container: {
    display: 'flex',
    gap: 2,
  },

  buttonBase: {
    flex: '0 0 168px',
    position: 'relative',
    height: 238,

    '& .item-content': {
      opacity: 0,
      position: 'absolute',
      zIndex: 9,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.4)',
      color: '#fff',
      transition: 'all 0.5s ease-out',
    },

    // 选择中的模版样式
    '& .item-content-selected': {
      opacity: 1,
      position: 'absolute',
      zIndex: 9,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.4)',
      color: '#fff',
      transition: 'all 0.5s ease-out',
    },

    '&:hover': {
      '& .item-content': {
        opacity: 1,
      },

      '& .item-content-selected': {
        opacity: 0,
      },
    },

    '& .item-name': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  },
};
