import heartBeat from './heartBeat';
import shakeY from './shakeY';

const animations = {
  heartBeat,
  shakeY,
};

export type AnimationsKeys = keyof typeof animations;
export default animations;
