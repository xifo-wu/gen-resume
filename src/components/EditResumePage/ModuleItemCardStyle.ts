export default {
  container: {
    p: 1,
    color: 'rgb(255, 255, 255)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    minWidth: '0px',
    overflowWrap: 'break-word',
    backgroundClip: 'border-box',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderRadius: 2,
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
    cursor: 'pointer',
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
    color: 'rgb(255, 255, 255)',
    fontWeight: '700',
  },
  editBox: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  editIcon: {
    userSelect: 'none',
    fontSize: '1.375rem',
  },
};
