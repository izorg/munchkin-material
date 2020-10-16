import { ListItemIcon, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { Palette } from 'mdi-material-ui';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import themes from '../../../../styles/themes';
import { parseSearch, stringifyQuery } from '../../../../utils/location';
import themeMessages from '../../../theme/messages';
import useMenuOpen from '../../useMenuOpen';
import ListItem from '../Item';
import ListItemText from '../ItemText';

const displayName = 'ThemeItem';

const useStyles = makeStyles(
  {
    root: {
      paddingBottom: 0,
      paddingTop: 0,
    },
  },
  { name: displayName },
);

const ThemeItem = ({ className, ...rest }) => {
  const classes = useStyles();
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const themeKey = useSelector((state) => state.present.theme.id);

  const open = useMenuOpen();

  const onClick = () => {
    const to = {
      ...location,
      search: stringifyQuery({
        ...parseSearch(location.search),
        menu: undefined,
        theme: null,
      }),
    };

    if (open) {
      navigate(to, { replace: true });
    } else {
      navigate(to);
    }
  };

  return (
    <ListItem
      button
      className={clsx(className, classes.root)}
      onClick={onClick}
      {...rest}
    >
      <ListItemIcon>
        <Palette style={{ color: theme.palette.primary.main }} />
      </ListItemIcon>
      <ListItemText
        primary={intl.formatMessage(themeMessages.label)}
        secondary={intl.formatMessage(themes[themeKey].messages.name)}
      />
    </ListItem>
  );
};

ThemeItem.displayName = displayName;

export default ThemeItem;
