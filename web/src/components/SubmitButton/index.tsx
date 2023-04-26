import { Button, type ButtonProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

const SubmitButton = (props: ButtonProps) => (
  <Button color="primary" type="submit" {...props}>
    {props.children === undefined ? (
      <FormattedMessage defaultMessage="OK" id="button.submit" />
    ) : (
      props.children
    )}
  </Button>
);

export default SubmitButton;
