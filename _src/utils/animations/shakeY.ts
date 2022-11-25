import { keyframes } from '@mui/material';

const shakeY = keyframes`
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(0, -15px, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(0, 0, 0);
  }
`;

export default shakeY;
