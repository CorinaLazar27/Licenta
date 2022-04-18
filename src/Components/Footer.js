import { Box } from "@material-ui/core";
import React, { useState } from "react";

function Footer() {
  return (
    <Box
      sx={{
        boxShadow: 3,
        backgroundColor: "#9575cd",
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "4vh",
      }}
    ></Box>
  );
}
export default Footer;
