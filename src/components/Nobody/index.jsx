import { makeStyles, Typography } from '@material-ui/core';
import { AccountCircle } from 'mdi-material-ui';
import { FormattedMessage } from 'react-intl';

const displayName = 'Nobody';

const useStyles = makeStyles(
  (theme) => ({
    nobody: {
      alignItems: 'center',
      color: theme.palette.text.secondary,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },

    nobodyIcon: {
      height: 96,
      marginBottom: theme.spacing(2),
      opacity: 0.2,
      width: 96,
    },
  }),
  { name: displayName },
);

const Nobody = () => {
  const classes = useStyles();

  return (
    <div className={classes.nobody}>
      <AccountCircle className={classes.nobodyIcon} />
      <Typography
        align="center"
        color="inherit"
        component="div"
        variant="subtitle1"
      >
        <FormattedMessage
          defaultMessage="No players in the list"
          id="player.list.empty"
        />
      </Typography>
    </div>
  );
};

Nobody.displayName = displayName;

export default Nobody;
