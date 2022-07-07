import { Box, Button, Card, CardContent, Divider, FormControl, Grid, Typography } from '@mui/material';
import NextLink from "next/link";
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import React,{useContext, useEffect} from "react"
import {CartContext} from "../../context/cart/CartContext"
import { useRouter } from 'next/router' 
import {AuthContext} from "../../context/auth/AuthContext"
export var id 


const CartPage = () => {
    const{user,isLoggedIn}=useContext(AuthContext)
    const router = useRouter()
    const{cart,numberOfItems,subTotal,tax,total,isLoaded}=useContext(CartContext)
    useEffect(()=>{
        if(isLoaded && cart.length === 0){
            router.replace('/cart/empty');
        }
    },[!isLoaded || cart.length === 0]);

    if(!isLoaded || cart.length === 0){
        return (<></>);
    }

    const userId= user?.email 

    


    const enviar= {numberOfItems,subTotal,total,orderItems:cart,userId}

    const handleSubmit=(e:any)=>{
        e.preventDefault();
        if(!cart||
            !numberOfItems||
            !subTotal||
            !total           
                ){
                alert ("debe completar su carrito")
            }
        
        else{enviarDatos()}    

    }

    const enviarDatos= async()=>{
        try{
            const t= await fetch("https://globalmarkets13.herokuapp.com/orders",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(enviar)
            })
            const check= await t.json()
            id=check
            console.log("check", check )
        }
        catch(error){
            console.log(error)
        }

         

        router.push("/checkout/address")



    }

    return (
      <ShopLayout title='Carrito - 3' pageDescription={'Carrito de compras de la tienda'}>
          <Typography variant='h1' component='h1'>Carrito</Typography>
          <FormControl onSubmit={handleSubmit} >
              <Grid container>
                  <Grid item xs={ 12 } sm={ 7 }>
                      <CartList editable />
                  </Grid>
                  <Grid item xs={ 12 } sm={ 5 }>
                      <Card className='summary-card'>
                          <CardContent>
                              <Typography variant='h2'>Orden</Typography>
                              <Divider sx={{ my:1 }} />
  
                              <OrderSummary />
  
                              <Box sx={{ mt: 3 }}>
                              <NextLink href="/checkout/address">
                                  <Button color="secondary" className='circular-btn' fullWidth onClick={handleSubmit} disabled={!isLoggedIn}  >
                                      Checkout
                                  </Button>
                              </NextLink>
                              </Box>
  
                          </CardContent>
                      </Card>
                  </Grid>
                  
              </Grid>
          </FormControl>
  
  
      </ShopLayout>
    )
  }
  
export default CartPage;

