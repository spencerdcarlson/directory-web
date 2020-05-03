import React, {useContext, useState, useEffect} from 'react';
import Cookies from "js-cookie";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import JwtDecode from "jwt-decode";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import {UserContext} from "../../context/user";
import api from "../../api/api";
import auth from "../../api/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const is_expired = (numeric_date) => {
    let exp = new Date(1970, 0, 1);
    exp.setSeconds(numeric_date);
    const now = Date.now();
    return exp <= now;
};

const has_correct_audience = (aud) => aud === "60656576001-s9srk1lkhg9dmbgm61afsab47sgrs928.apps.googleusercontent.com";


export default function NavBar() {
    const [{ user }, dispatch] = useContext(UserContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

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

    const handleChange = (event) => {
        // setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        auth.logout();
        Cookies.remove("id_token");
        dispatch({ key: "user", value: null });
    }

    const renderLogin = () => {
        if (user) {
            return (
                <>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </Menu>
                </>
            )
        }
        else {
            return <Button href={`${api.host}/auth/google`} color="inherit">Login</Button>
        }
    }

    return (<AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} />
            {renderLogin()}
        </Toolbar>
    </AppBar>)
}