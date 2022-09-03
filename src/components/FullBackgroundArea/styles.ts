const containerSX = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
};

const backgroundBoxSX = (src: string) => ({
  width: '100%',
  maxWidth: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${src})`,
});

const overlayBottomSX = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 60%, black 90%)',
};

export default {
  containerSX,
  backgroundBoxSX,
  overlayBottomSX,
};
