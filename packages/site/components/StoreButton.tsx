import { Button, type ButtonProps } from "@mui/material";

export const StoreButton = (props: ButtonProps<"a">) => (
  <Button
    color="inherit"
    href=""
    rel="noopener noreferrer"
    size="large"
    sx={{
      width: 200,
    }}
    target="_blank"
    variant="outlined"
    {...props}
  />
);
