import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { UserContext } from "../context/user";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import JwtDecode from "jwt-decode";
import Typography from "@material-ui/core/Typography";
import api from "../api/api";
import auth from "../api/auth";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "white"
  }
}));

const is_expired = (numeric_date) => {
  let exp = new Date(1970, 0, 1);
  exp.setSeconds(numeric_date);
  const now = Date.now();
  return exp <= now;
};

const has_correct_audience = (aud) => aud === "60656576001-s9srk1lkhg9dmbgm61afsab47sgrs928.apps.googleusercontent.com";

export default function Login() {
  const [{ user }, dispatch] = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    if (!!!user) {
      const encoded = Cookies.get("id_token");
      if (encoded) {
        let res = JwtDecode(encoded);
        if (!is_expired(res.exp) && has_correct_audience(res.aud)) {
          dispatch({ key: "user", value: res });
        }
      }
    }
  }, [user]);

  if (user) {
    return (<>
        <Typography variant="h2">{user.name}</Typography>
        <Button variant="contained" color="secondary" className={classes.button} onClick={(e) => {
          auth.logout();
          e.preventDefault();
          Cookies.remove("id_token");
          dispatch({ key: "user", value: null });
        }}>Logout</Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={(e) => {
          api.get({ url: "/api/ds/session/whoami" });
        }}>Whoami - Session</Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={(e) => {
          api.get({ url: "/api/ds/jwt/whoami" });
        }}>Whoami - JWT</Button>
      </>
    );
  } else {
    return (<>
      <Button variant="contained" color="primary" className={classes.button}
              href={`${api.host}/auth/google`}>Login</Button></>);
  }
}