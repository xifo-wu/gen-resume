export default {
  signUpPaper: {
    p: 2,
    my: 2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    m: 0,
    fontWeight: 700,
    lineHeight: 1.33,
    fontSize: {
      xs: '1.375rem',
      sm: '1.5rem',
      md: '1.75rem',
    },
  },

  subTitle: {
    background:
      'linear-gradient(95deg, #1c7ed6 15%, #22b8cf 45%, #FB5343 75%, #6549D5 100%) 98%/200% 100%',
    textTransform: 'capitalize',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
    fontFamily: 'Public Sans,sans-serif',
    display: 'inline',
    fontSize: {
      xs: '0.625rem',
      sm: '0.875rem',
      md: '1rem',
    },
  },

  contentBox: {
    maxWidth: 375,
    margin: 'auto',
    mt: 3,
  },
};
