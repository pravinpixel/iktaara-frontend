import { deviceSize } from '../utils/constants';
import { colors } from './colors';

const breakpoints: any = Object.keys(deviceSize).map(
  (key) => deviceSize[key] + 'px',
);

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const themeOptions = {
  default: { colors, breakpoints },
};

export default themeOptions;
