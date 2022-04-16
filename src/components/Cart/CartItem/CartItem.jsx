import React from 'react';
import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from '@material-ui/core';
import useStyles from './styles';
import { useContext } from 'react';
import { CartActions } from '../../../App';

const CartItem = ({ item }) => {
    const classes = useStyles();
    const cartActions = useContext(CartActions);

    return (
        <>
            <Card>
                <CardMedia
                    image={item.image.url}
                    alt="item "
                    className={classes.media}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body2">
                        {item.line_total.formatted_with_symbol}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cartActions}>
                    <div className={classes.buttons}>
                        <Button
                            type="button"
                            size="small"
                            onClick={() => {
                                cartActions.handleDecreaseProduct(
                                    item.id,
                                    item.quantity,
                                );
                            }}
                        >
                            -
                        </Button>
                        <Typography>{item.quantity}</Typography>
                        <Button
                            type="button"
                            size="small"
                            onClick={() => {
                                cartActions.handleIncreaseProduct(
                                    item.id,
                                    item.quantity,
                                );
                            }}
                        >
                            +
                        </Button>
                    </div>
                    <Button
                        variant="contained"
                        type="button"
                        color="secondary"
                        onClick={() => {
                            cartActions.handleRemoveProduct(item.id);
                        }}
                    >
                        Remove
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default CartItem;
