import { Box } from "@mui/material";
import { type Viewport } from "next";

export const viewport: Viewport = {
  colorScheme: "light",
};

const NotFound = () => (
  <Box
    sx={{
      alignItems: "center",
      display: "flex",
      height: "100dvh",
      justifyContent: "center",
    }}
  >
    404 Not Found
  </Box>
);

export default NotFound;
