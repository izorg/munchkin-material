import {
  brown500, brown700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import { ios } from '../helpers/platforms';

const theme = {
  palette: {
    primary1Color: brown500,
    primary2Color: brown700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: brown500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },

  appBar: {
    height: 56,
    padding: spacing.desktopGutterLess,
  },

  avatar: {
    backgroundColor: brown500,
  },
};

if (ios) {
  Object.assign(theme, {
    fontFamily: '"San Francisco", sans-serif',
  });
}

export default theme;
