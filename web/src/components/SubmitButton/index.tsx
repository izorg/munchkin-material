import { Button, type ButtonProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

const SubmitButton = ({
  children = <FormattedMessage defaultMessage="OK" id="button.submit" />,
  ...props
}: ButtonProps) => (
  <Button color="primary" type="submit" {...props}>
    {children}
  </Button>
);

export default SubmitButton;
