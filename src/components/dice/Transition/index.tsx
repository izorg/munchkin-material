import { ClassNames } from "@emotion/react";
import { useTheme } from "@mui/material";
import { CSSTransition } from "react-transition-group";
import type { CSSTransitionProps } from "react-transition-group/CSSTransition";

const addEndListener = (node: HTMLElement, done: () => void): void => {
  node.addEventListener("transitionend", done, false);
};

const DiceTransition = (props: Partial<CSSTransitionProps>): JSX.Element => {
  const theme = useTheme();

  const enterTransition = theme.transitions.create("transform", {
    delay: theme.transitions.duration.shortest,
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.easeOut,
  });

  const exitTransition = theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.easeIn,
  });

  return (
    <ClassNames>
      {({ css }) => (
        <CSSTransition
          {...props}
          addEndListener={addEndListener}
          classNames={{
            enter: css`
              transform: scale(0);
              will-change: transform;
            `,
            enterActive: css`
              transform: scale(1);
              transition: ${enterTransition};
            `,
            exit: css`
              transform: scale(1);
              will-change: transform;
            `,
            exitActive: css`
              transform: scale(0);
              transition: ${exitTransition};
            `,
          }}
        />
      )}
    </ClassNames>
  );
};

export default DiceTransition;
