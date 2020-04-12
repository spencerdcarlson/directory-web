import React, {useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { UserContext } from "../context/user";
import Login from "./Login";

export default function Home() {
  const [{user, role}] = useContext(UserContext);
  console.log(`state: ${user}`)
  if (user && role) {
    return (<><Typography variant="h4">Logged In</Typography></>)
  }
  else {
    return (
      <Login/>
    );
  }
}