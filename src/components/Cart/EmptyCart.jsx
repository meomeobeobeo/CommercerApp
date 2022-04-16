import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
    return (
        <Link to="/">
            <Typography variant="subtitle1">
                You have no Item in your Cart, start adding somethings.
            </Typography>
        </Link>
    );
};

export default EmptyCart;
