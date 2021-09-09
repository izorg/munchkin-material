import { css } from "@emotion/react";
import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import { SvgIcon, useTheme } from "@mui/material";
import PropTypes from "prop-types";

import CounterButton from "../../../components/Counter/Button";
import CounterLabel from "../../../components/Counter/Label";

const CombatCounter = ({
  className,
  decrementDisabled,
  incrementDisabled,
  onDecrement,
  onIncrement,
  title,
  value,
}) => {
  const theme = useTheme();

  const buttonCss = css`
    font-size: 36px;
    padding: 0;

    @media (orientation: landscape) {
      font-size: 32px;

      ${theme.breakpoints.up("sm")} {
        font-size: 36px;
      }
    }
  `;

  const iconCss = css`
    font-size: inherit;
  `;

  return (
    <div
      className={className}
      css={css`
        align-items: center;
        display: flex;
        flex-direction: column;
      `}
    >
      <CounterLabel
        css={css`
          font-size: 16px;
          text-align: center;
          width: 100%;

          "@media (orientation: portrait) and (min-width: 360px) and (min-height: 600px)": {
            font-size: 20px;
          }
        `}
      >
        {title}
      </CounterLabel>

      <div
        css={css`
          color: ${theme.palette.text.primary};
          font-family: "Munchkin", ${theme.typography.fontFamily};
          font-size: ${theme.typography.h4.fontSize};
          line-height: ${theme.typography.h4.lineHeight};
        `}
      >
        {value}
      </div>

      <div
        css={css`
          display: flex;
          justify-content: space-around;
          max-width: 90px;
          width: 100%;
        `}
      >
        <CounterButton
          css={buttonCss}
          disabled={decrementDisabled}
          onClick={onDecrement}
        >
          <SvgIcon css={iconCss}>
            <path d={mdiMenuDown} />
          </SvgIcon>
        </CounterButton>

        <CounterButton
          css={buttonCss}
          disabled={incrementDisabled}
          onClick={onIncrement}
        >
          <SvgIcon css={iconCss}>
            <path d={mdiMenuUp} />
          </SvgIcon>
        </CounterButton>
      </div>
    </div>
  );
};

CombatCounter.propTypes = {
  className: PropTypes.string,
  decrementDisabled: PropTypes.bool,
  incrementDisabled: PropTypes.bool,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
};

CombatCounter.defaultProps = {
  decrementDisabled: false,
  incrementDisabled: false,
};

export default CombatCounter;
