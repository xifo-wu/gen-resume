export default {
  menuContainer: {
    width: 168,
    color: '#FFF',
    borderBottomLeftRadius: 12,
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem',
    background: 'rgba(0, 0, 0, 0.1) ',
    position: 'sticky',
    top: 0,
  },
  modulesBox: {
    mb: 1.5,
    p: 1,
    '& ul, & li': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: 24,
    },
    '& li': {
      borderRadius: '1rem',
      mb: 1.5,
    }
  },

  // form components styles start
  input: {
    '& .MuiFormLabel-root': {
      color: 'rgba(255, 255, 255, 0.9)',
    },
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.88)',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
    '& .MuiInputBase-colorPrimary': {
      color: 'rgba(255, 255, 255, 0.9)',
    },
  },
  // form components styles end
};
