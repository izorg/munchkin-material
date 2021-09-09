import { Button, ButtonProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

const SubmitButton = (props: ButtonProps): JSX.Element => <Button {...props} />;

SubmitButton.defaultProps = {
  children: <FormattedMessage defaultMessage="OK" id="button.submit" />,
  color: "primary",
  type: "submit",
};

export default SubmitButton;
