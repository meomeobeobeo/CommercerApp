import React from 'react'
import { InputLabel,Select , MenuItem , Button , Grid ,FormControl , Typography ,Box } from '@material-ui/core'
import { useForm ,  FormProvider } from 'react-hook-form'
import {useState , useEffect} from 'react'
import {Link} from 'react-router-dom';
import FormInput from './FormInput'
import {commerce} from '../../lib/commerce'

const AddressForm = ({checkoutToken , next}) => {
    const methods = useForm();

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
   
    // change object{code : name , code : name} to array [{code , name}]
    const countries = Object.entries(shippingCountries).map(([code , name]) => {

        return {
            id : code,
            label : name,
        }
    })

    const subdivisions = Object.entries(shippingSubdivisions).map(([code , name ])=>{
        return {
            divisionCode : code,
            label : name
        }
    })

    const options = shippingOptions.map((option)=>{
        return {
            id : option.id,
            label : `${option.description}  -   ${option.price.formatted_with_symbol}`
        }
    })
   
    const handleUpdateDataInput = (data) => {

    }



    // fetch country 
    const fetchShippingCountries = async (checkoutTokenId)  => {
        const res = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(res.countries)
       
        setShippingCountry(Object.keys(res.countries)[0])

    }
    // fetch sub divisions 
    const fetchSubdivisions = async (countryCode) => {
      try {
        const res = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(res.subdivisions)
        console.log(res.subdivisions)
      } catch (error) {

          
      }
    }
    // fetch shippingOption 
    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
        setShippingOptions(options);
        setShippingOption(options[0].id);
        

    }; 
    
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
        

    },[])
    useEffect(() =>{
       if(shippingCountry){
            fetchSubdivisions(shippingCountry)
       }
    },[shippingCountry])
   
    useEffect(() => {
        if (shippingSubdivision) {
            fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
        }
      }, [shippingSubdivision]);



  return (
    <Box sx = {{
        paddingLeft:'20px ',
        paddingRight: '20px',
        paddingBottom :'20px',
    
    }}>
        <Typography variant = 'h6' gutterBottom>Shipping Address . </Typography>
        <FormProvider   {...methods}>
            <form onSubmit={methods.handleSubmit((data )=>{
                // send data

                    next({...data , shippingCountry ,shippingSubdivision , shippingOption })
            })}>
                <Grid container spacing={3}>
                <FormInput required name="firstName" label="First name" />
                <FormInput required name="lastName" label="Last name" />
                <FormInput required name="address1" label="Address line 1" />
                <FormInput required name="email" label="Email" />
                <FormInput required name="city" label="City" />
                <FormInput required name="zip" label="Zip / Postal code" />
                {/* choose country  */}
                <Grid item xs = {12} sm = {6}>
                    <FormControl fullWidth>
                        <InputLabel >Country</InputLabel>
                                <Select
                                value={shippingCountry}
                                onChange={(e)=>{setShippingCountry(e.target.value)}}
                                fullWidth
                                >
                                    {countries.map((country)=>{
                                        return (
                                            <MenuItem value = {country.id} key = {country.id}>{country.label}</MenuItem>
                                        )
                                    })}


                                </Select>
                         </FormControl>

                </Grid>     
               
                {/* choose sub divisions */}
                <Grid item xs = {12} sm = {6}>
                    <FormControl fullWidth>
                    <InputLabel >Sub divisons ,Province, city</InputLabel>
                                <Select
                                value={shippingSubdivision}
                                onChange={(e)=>{setShippingSubdivision(e.target.value)}}
                                fullWidth
                                >
                                    {subdivisions.map((division)=>{
                                        return (
                                            <MenuItem value = {division.divisionCode} key = {division.divisionCode}>{division.label}</MenuItem>
                                        )
                                    })}


                                </Select>
                    </FormControl>

                </Grid>   
                {/* choose shipping options */}
                <Grid item xs = {12} sm = {6}>
                    <FormControl fullWidth>
                    <InputLabel >Shipping <option value=""></option></InputLabel>
                                <Select
                                value={shippingOption.id}
                                onChange={(e)=>{setShippingOption(e.target.value)}}
                                fullWidth
                                >
                                    {options.map((option)=>{
                                        return (
                                            <MenuItem value = {option.id} key = {option.id}>{option.label}</MenuItem>
                                        )
                                    })}


                                </Select>
                         </FormControl>

                </Grid>                                      
                    

                </Grid> 
                <Box sx = {
                    {
                        display: 'flex',
                        justifyContent : 'center',
                        marginTop :'8px'
                    }
                }>
                    <Button component = {Link} color='secondary' to = '/cart' variant='outlined' style = {{
                        minWidth : '150px',
                        marginLeft : '8px',
                        marginRight : '8px',
                        
                       
                }}>Back to cart</Button>
                    <Button type = 'submit' color = 'primary' variant='contained' style = {{
                        minWidth : '150px',
                        marginLeft : '8px',
                        marginRight : '8px',
                       
                        }} >Next</Button>
                </Box>

            </form>
        </FormProvider>
    
    </Box>
  )
}

export default AddressForm