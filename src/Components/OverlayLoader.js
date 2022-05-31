import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

function OverlayLoader() {
  return (
    <Backdrop
      open={true}
      sx={{
        color: "#fff",
        zIndex: 999999,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" color="primary.text">
          Se încarcă...
        </Typography>
      </Box>
    </Backdrop>
  );
}
export default OverlayLoader;
