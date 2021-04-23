import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";

const displayName = "Title";

const useStyles = makeStyles(
  (theme) => ({
    title: {
      flex: 1,
      paddingLeft: 24,

      [theme.breakpoints.up("md")]: {
        paddingLeft: 20,
      },
    },
  }),
  { name: displayName }
);

const Title = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <Typography
      className={clsx(classes.title, className)}
      color="inherit"
      noWrap
      variant="h6"
      {...props}
    />
  );
};

Title.propTypes = {
  className: PropTypes.string,
};

Title.displayName = displayName;

export default Title;
