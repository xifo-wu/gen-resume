export default {
  container: {
    p: 2,
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    minWidth: '0px',
    overflowWrap: 'break-word',
    backgroundColor: 'rgb(255, 255, 255)',
    backgroundClip: 'border-box',
    border: '0px solid rgba(0, 0, 0, 0.125)',
    borderRadius: '1rem',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0rem 1.25rem 1.6875rem 0rem',
    gap: 1,
  },
  grabBox: {
    display: 'flex',
    alignItems: 'center',
  },
  grabIcon: {
    userSelect: 'none',
    fontSize: '1.375rem',
    cursor: 'grab',
  },
  titleBox: {
    flex: 1,
    userSelect: 'none',
  },
  enTitle: {
    margin: '0px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '0.375rem',
    lineHeight: '1.5',
    letterSpacing: '0.02857em',
    opacity: '1',
    textTransform: 'capitalize',
    verticalAlign: 'unset',
    textDecoration: 'none',
    color: 'rgb(103, 116, 142)',
    fontWeight: '700',
  },
  title: {
    margin: '0px',
    fontSize: '0.875rem',
    lineHeight: 1.375,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    letterSpacing: '0em',
    opacity: '1',
    textTransform: 'none',
    verticalAlign: 'unset',
    textDecoration: 'none',
    color: 'rgb(52, 71, 103)',
    fontWeight: '700',
  },
  editBox: {
    cursor: 'pointer',
    width: '2rem',
    height: '2rem',
    marginLeft: 'auto',
    display: 'flex',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    opacity: '1',
    background: 'linear-gradient(310deg, rgb(32, 101, 209), rgb(33, 212, 253))',
    color: 'rgb(255, 255, 255)',
    borderRadius: '0.5rem',
    boxShadow:
      'rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem',
  },
  editIcon: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    overflow: 'hidden',
    display: 'inline-block',
    textAlign: 'center',
    flexShrink: '0',
    fontSize: '1rem !important',
  },
};