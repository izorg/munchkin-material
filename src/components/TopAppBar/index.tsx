import { css } from "@emotion/react";
import { AppBar, Toolbar, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import type { FC } from "react";

const TopAppBar: FC = ({ children }) => {
  const theme = useTheme();

  return (
    <AppBar
      css={css`
        z-index: ${theme.zIndex.appBar};
      `}
      position="static"
    >
      <Toolbar
        css={[
          css`
            ${theme.breakpoints.up("md")} {
              min-height: 64px;
            }

            @supports (min-height: calc(env(safe-area-inset-top))) {
              min-height: calc(56px + env(safe-area-inset-top));
              padding-top: env(safe-area-inset-top);

              ${theme.breakpoints.up("md")} {
                min-height: calc(64px + env(safe-area-inset-top));
              }
            }
          `,
          // gutters override
          css`
            padding-left: ${theme.spacing(2)};
            padding-right: ${theme.spacing(2)};

            @supports (padding: max(0px)) {
              padding-left: max(${theme.spacing(2)}, env(safe-area-inset-left));
              padding-right: max(
                ${theme.spacing(2)},
                env(safe-area-inset-right)
              );
            }

            ${theme.breakpoints.up("sm")} {
              padding-left: ${theme.spacing(3)};
              padding-right: ${theme.spacing(3)};

              @supports (padding: max(0px)) {
                padding-left: max(
                  ${theme.spacing(3)},
                  env(safe-area-inset-left)
                );
                padding-right: max(
                  ${theme.spacing(3)},
                  env(safe-area-inset-right)
                );
              }
            }
          `,
        ]}
      >
        {children}
      </Toolbar>
    </AppBar>
  );
};

TopAppBar.propTypes = {
  children: PropTypes.node,
};

export default TopAppBar;
