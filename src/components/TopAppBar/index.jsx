import { AppBar, makeStyles, Toolbar, useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';

const displayName = 'TopAppBar';

const useStyles = makeStyles(
  /* eslint-disable sort-keys */
  (theme) => ({
    appBar: {
      zIndex: theme.zIndex.appBar,
    },

    gutters: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),

      '@supports (padding: max(0px))': {
        paddingLeft: `max(${theme.spacing(2)}, env(safe-area-inset-left))`,
        paddingRight: `max(${theme.spacing(2)}, env(safe-area-inset-right))`,
      },

      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),

        '@supports (padding: max(0px))': {
          paddingLeft: `max(${theme.spacing(3)}, env(safe-area-inset-left))`,
          paddingRight: `max(${theme.spacing(3)}, env(safe-area-inset-right))`,
        },
      },
    },

    toolbar: {
      [theme.breakpoints.up('md')]: {
        minHeight: 64,
      },

      '@supports (min-height: calc(env(safe-area-inset-top)))': {
        minHeight: 'calc(56px + env(safe-area-inset-top))',
        paddingTop: 'env(safe-area-inset-top)',

        [theme.breakpoints.up('md')]: {
          minHeight: 'calc(64px + env(safe-area-inset-top))',
        },
      },
    },
  }),
  /* eslint-enable */
  { name: displayName },
);

const TopAppBar = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const color = theme.palette.mode === 'dark' ? 'default' : 'primary';

  return (
    <AppBar className={classes.appBar} color={color} position="static">
      <Toolbar
        classes={{
          gutters: classes.gutters,
        }}
        className={classes.toolbar}
      >
        {children}
      </Toolbar>
    </AppBar>
  );
};

TopAppBar.propTypes = {
  children: PropTypes.node,
};

TopAppBar.displayName = displayName;

export default TopAppBar;
