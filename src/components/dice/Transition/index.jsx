import { makeStyles } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";

const displayName = "DiceTransition";

const useStyles = makeStyles(
  (theme) => ({
    enter: {
      transform: "scale(0)",
      willChange: "transform",
    },

    enterActive: {
      transform: "scale(1)",
      transition: theme.transitions.create("transform", {
        delay: theme.transitions.duration.shortest,
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeOut,
      }),
    },

    exit: {
      transform: "scale(1)",
      willChange: "transform",
    },

    exitActive: {
      transform: "scale(0)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeIn,
      }),
    },
  }),
  { name: displayName }
);

const addEndListener = (node, done) =>
  node.addEventListener("transitionend", done, false);

const DiceTransition = (props) => {
  const classes = useStyles();

  return (
    <CSSTransition
      {...props}
      addEndListener={addEndListener}
      classNames={classes}
    />
  );
};

DiceTransition.displayName = displayName;

export default DiceTransition;
