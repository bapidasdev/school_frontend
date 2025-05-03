import { Outlet } from "react-router-dom";

import Footer from "./utility components/footer/Footer";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

export default function Client() {

const theme = useTheme();
  return (
    <>
      
      <Box
        // className="container-hero"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          backgroundColor: theme.palette.background.paper,
       
        }}
        component={"div"}
      >
        <Outlet />
      </Box>

      <Footer />
    </>
  );
}
