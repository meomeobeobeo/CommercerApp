import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    MenuItem,
    Menu,
    Typography,
} from '@mui/material';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import logo from '../../assets/commerce.png';
import { Link, useLocation } from 'react-router-dom';
const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography
                    component={Link}
                    to="/"
                    variant="h6"
                    sx={{ textDecoration: 'none' }}
                >
                    <img
                        src={logo}
                        alt="Shopping"
                        height="25px"
                        className={classes.image}
                    />
                    Go Shopping
                </Typography>

                <div className={classes.grow}></div>
                {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton
                            aria-label="Show cart items"
                            color="inherit"
                        >
                            <Badge badgeContent={totalItems} color="secondary">
                                <Link to={'/cart'}>
                                    <ShoppingCart />
                                </Link>
                            </Badge>
                        </IconButton>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
