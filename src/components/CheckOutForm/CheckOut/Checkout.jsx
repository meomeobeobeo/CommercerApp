import React from 'react';
import {
    Paper,
    Box,
    Stepper,
    Step,
    StepLabel,
    Typography,
    CircularProgress,
    Divider,
    Button,
} from '@material-ui/core';
import useStyles from './styles';
import { useState, useEffect } from 'react';
import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {Link} from 'react-router-dom'

const steps = ['Shipping address ', 'Payment details'];

const CheckOut = ({ cart , onCaptureCheckout ,order, error  }) => {
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData , setShippingData] = useState({});
    // change to next step 
    const nextStep = ()=>{
      setActiveStep(prevStep => prevStep+1)
    }
    // change to back step
    const backStep = ()=>{
      setActiveStep(prevStep => prevStep-1)
    }
    // next data  
    const next = (data)=>{
      setShippingData(data)
      nextStep()
    }
   










    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: 'cart',
                }); // generate token id when order from cart use cart Id hehe

                console.log(token);
                setCheckoutToken(token);
            } catch (e) {}
        };
        generateToken();
    }, [cart]);
// confirm component
    let Confirmation = () => (order.customer ? (
      <>
        <div>
          <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    ));
  
    if (error) {
      Confirmation = () => (
        <>
          <Typography variant="h5">Error: {error}</Typography>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      );
    }


// end 

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next = {next} />
        ) : (
            <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout}  />
        );
    return (
        <>
            <div className={classes.toolbar}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography
                            variant="h4"
                            align="center"
                            className={classes.title}
                        >
                            Check out
                        </Typography>
                        <Stepper
                            activeStep={activeStep}
                            className={classes.stepper}
                        >
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Confirmation />
                        ) : (
                            checkoutToken && <Form />
                        )}
                        {/* // when checkoutToken is different null or undefined mount Form element  */}
                    </Paper>
                </main>
            </div>
        </>
    );
};

export default CheckOut;
