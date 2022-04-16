import React from 'react';

import { Container, Grid, Typography, Button, Box } from '@mui/material';

import EmptyCart from './EmptyCart';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleEmptyCart }) => {
    const classes = useStyles();
    const isEmpty = !cart?.line_items?.length;

    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} />
                        </Grid>
                    ))}
                </Grid>
                <Box className={classes.cardDetails}>
                    <Typography variant="h5">
                        Subtotal :{cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <Box sx={{ marginLeft: '8px' }}>
                        <Button
                            className={classes.emptyButton}
                            size="large"
                            type="button"
                            variant="contained"
                            color="secondary"
                            sx={{ marginBottom: '8px' }}
                            onClick={() => {
                                handleEmptyCart();
                            }}
                        >
                            Empty Cart
                        </Button>
                        <Button
                            component={Link}
                            to="/checkout"
                            className={classes.checkoutButton}
                            size="large"
                            type="button"
                            variant="contained"
                            color="primary"
                            sx={{ marginBottom: '8px' }}
                        >
                            Check out .{' '}
                        </Button>
                    </Box>
                </Box>
            </>
        );
    };

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography variant="h3" className={classes.title}>
                Your shopping Cart{' '}
            </Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
};

export default Cart;
