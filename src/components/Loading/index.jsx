import { css } from "@emotion/react";
import { CircularProgress } from "@material-ui/core";

const Loading = () => (
  <div
    css={css`
      align-items: center;
      display: flex;
      flex: 1;
      height: 100%;
      justify-content: center;
      width: 100%;
    `}
  >
    <CircularProgress />
  </div>
);

export default Loading;
