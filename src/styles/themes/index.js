import apocalypse, {
  key as apocalypseKey,
  name as apocalypseName,
} from './apocalypse';
import booty, { key as bootyKey, name as bootyName } from './booty';
import chtulhu, { key as chtulhuKey, name as chtulhuName } from './chtulhu';
import munchkin, { key as munchkinKey, name as munchkinName } from './munchkin';

export const names = {
  [apocalypseKey]: apocalypseName,
  [bootyKey]: bootyName,
  [chtulhuKey]: chtulhuName,
  [munchkinKey]: munchkinName,
};

export default {
  [apocalypseKey]: apocalypse,
  [bootyKey]: booty,
  [chtulhuKey]: chtulhu,
  [munchkinKey]: munchkin,
};
