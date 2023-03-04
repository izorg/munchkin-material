import { Button, type ButtonProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

const SubmitButton = (props: ButtonProps) => <Button {...props} />;

SubmitButton.defaultProps = {
  children: <FormattedMessage defaultMessage="OK" id="button.submit" />,
  color: "primary",
  type: "submit",
};

export default SubmitButton;
