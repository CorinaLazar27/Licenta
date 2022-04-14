import { Box } from "@material-ui/core";
import React, { useState } from "react";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "4vh",
        bottom: "0",
        minWidth: "100vw",
        position: "fixed",
      }}
    ></Box>
  );
}
export default Footer;
