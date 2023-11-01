import { Box, CircularProgress } from "@mui/material";

const Loading = () => (
  <Box
    sx={{
      alignItems: "center",
      display: "flex",
      flex: 1,
      height: "100%",
      justifyContent: "center",
      width: "100%",
    }}
  >
    <CircularProgress />
  </Box>
);

export default Loading;
