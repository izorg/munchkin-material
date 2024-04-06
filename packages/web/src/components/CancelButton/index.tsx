import { Button, type ButtonProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

const CancelButton = ({
  // eslint-disable-next-line formatjs/enforce-id
  children = <FormattedMessage defaultMessage="Cancel" id="button.cancel" />,
  ...props
}: ButtonProps) => (
  <Button color="primary" type="button" {...props}>
    {children}
  </Button>
);

export default CancelButton;
