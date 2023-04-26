import { Button, type ButtonProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

const CancelButton = (props: ButtonProps) => (
  <Button color="primary" type="button" {...props}>
    {props.children === undefined ? (
      <FormattedMessage defaultMessage="Cancel" id="button.cancel" />
    ) : (
      props.children
    )}
  </Button>
);

export default CancelButton;
