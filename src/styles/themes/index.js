import apocalypse, {
  key as apocalypseKey,
  name as apocalypseName,
} from './apocalypse';
import booty, { key as bootyKey, name as bootyName } from './booty';
import cthulhu, { key as cthulhuKey, name as cthulhuName } from './cthulhu';
import legends, { key as legendsKey, name as legendsName } from './legends';
import munchkin, { key as munchkinKey, name as munchkinName } from './munchkin';
import star, { key as starKey, name as starName } from './star';
import superMunchkin, { key as superKey, name as superName } from './super';

export const names = {
  [apocalypseKey]: apocalypseName,
  [bootyKey]: bootyName,
  [cthulhuKey]: cthulhuName,
  [legendsKey]: legendsName,
  [munchkinKey]: munchkinName,
  [starKey]: starName,
  [superKey]: superName,
};

export default {
  [apocalypseKey]: apocalypse,
  [bootyKey]: booty,
  [cthulhuKey]: cthulhu,
  [legendsKey]: legends,
  [munchkinKey]: munchkin,
  [starKey]: star,
  [superKey]: superMunchkin,
};
