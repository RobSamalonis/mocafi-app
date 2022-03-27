import { useState } from "react";

import Create from "./components/Create";
import Delete from "./components/Delete";
import List from "./components/List";
import Login from "./components/Login";
import SideMenu from "./components/SideMenu";
import Update from "./components/Update";

import { Grid } from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import cn from "classnames";

import "./App.css";

function App() {
  const [appState, setAppState] = useState<string>("list");
  const [auth, setAuth] = useState(false);

  const Header = () => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#6200EE" }}>
        <Toolbar>
          <SideMenu setAppState={setAppState} setAuth={setAuth} />
          <Typography variant="h5" sx={{ flexGrow: 1, textAlign: "left" }}>
            MoCaFi
          </Typography>
          <Button color="inherit" onClick={() => setAuth(false)}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );

  const getCurrFunction = () => {
    switch (appState) {
      case "list":
        return <List />;
      case "create":
        return <Create />;
      case "delete":
        return <Delete />;
      case "update":
        return <Update />;
      default:
        return <List />;
    }
  };

  const getApp = () => (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {getCurrFunction()}
        </Grid>
      </Grid>
    </>
  );

  return (
    <div className={cn("App", { "no-auth": !auth })}>
      {auth ? getApp() : <Login setAuth={setAuth} />}
    </div>
  );
}

export default App;
