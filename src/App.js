import "./App.css";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/system";

import Customerslist from "./components/Customerslist";
import Trainingslist from "./components/Trainingslist";
import Main from "./components/Main";
import theme from "./Theme";

export default function Apps() {

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid container xs={12} spacing={0} direction="column">
          <Grid item xs={12} sx={{ m: 1 }}>
            <AppBar position="static" color={"secondary"}>
              <Toolbar variant="dense">
                <Typography variant="h5" component="div" color="primary.light">
                  Personal Trainer
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={12} sx={{ m: 2 }}>
            <Main />
          </Grid>
        </Grid >
      </div >
    </ThemeProvider >
  );
}

