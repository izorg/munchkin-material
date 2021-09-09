import { Button, ButtonProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

const CancelButton = (props: ButtonProps): JSX.Element => <Button {...props} />;

CancelButton.defaultProps = {
  children: <FormattedMessage defaultMessage="Cancel" id="button.cancel" />,
  color: "primary",
  type: "button",
};

export default CancelButton;
