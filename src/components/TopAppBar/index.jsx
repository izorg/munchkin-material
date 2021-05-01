import { ClassNames, css } from "@emotion/react";
import { AppBar, Toolbar, useTheme } from "@material-ui/core";
import PropTypes from "prop-types";

const displayName = "TopAppBar";

const TopAppBar = ({ children }) => {
  const theme = useTheme();

  const color = theme.palette.mode === "dark" ? "default" : "primary";

  const appBarCss = css`
    z-index: ${theme.zIndex.appBar};
  `;

  const toolbarCss = css`
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
  `;

  return (
    <ClassNames>
      {({ css }) => (
        <AppBar color={color} css={appBarCss} position="static">
          <Toolbar
            classes={{
              gutters: css`
                padding-left: ${theme.spacing(2)};
                padding-right: ${theme.spacing(2)};

                @supports (padding: max(0px)) {
                  padding-left: max(
                    ${theme.spacing(2)},
                    env(safe-area-inset-left)
                  );
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
            }}
            css={toolbarCss}
          >
            {children}
          </Toolbar>
        </AppBar>
      )}
    </ClassNames>
  );
};

TopAppBar.propTypes = {
  children: PropTypes.node,
};

TopAppBar.displayName = displayName;

export default TopAppBar;
