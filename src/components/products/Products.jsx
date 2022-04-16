import React from 'react';
import { Grid } from '@mui/material';
import useStyles from './styles';
import Product from '../product/Product';

const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}>
                <Grid container justifyContent="center" spacing={4}>
                    {products.map((product) => {
                        return (
                            <Grid item key={product.id} xs={12} sm={6} md={4}>
                                <Product
                                    product={product}
                                    onAddToCart={onAddToCart}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </main>
    );
};
export default Products;
