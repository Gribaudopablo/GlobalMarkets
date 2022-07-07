import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { ShopLayout } from "../../components/layouts"
import { useRouter } from 'next/router'
import {id} from "../cart/index"
import Cookies from 'js-cookie'
import { CartContext } from "../../context"


export var ordenP



const AddressPage = () => {
    const {removeAll} = useContext(CartContext)
    const router = useRouter()
    const _id= id


    const [input,setInput]= useState({

        firstName:"",
        lastName:"",
        address:"",
        zip:"",
        city:"",
        country:"",
        phone:""


    })
    
    
    const mandar= {shippingAddress:{...input}}

    ordenP=mandar

    const handleChange=(e:any)=>{
        const{value,name}=e.target

        setInput({
            ...input,
            [name]:value
        })
    }

    const handleSubmit=(e:any)=>{
        e.preventDefault();
        if(!input.firstName||
            !input.lastName||
            !input.address||
            !input.zip||
            !input.city||
            !input.country||
            !input.phone){
                alert("* parametro requerido")
            }

        else{
            Cookies.remove('cart');
            removeAll();
            sendDatos(input);
        }   
    }

    const sendDatos= async(input:any)=>{
        try{ 

            console.log("input", input)

            const x= await fetch(`https://globalmarkets13.herokuapp.com/orders/${_id._id}`,{
                method:"PUT",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify(mandar)
            })
            const data= await x.json()
            
            console.log("data",data)

            let y:String[]=[];
            y.push(input)

            console.log("mandar",mandar)
            console.log("esto es y",y)
            
        }
        catch(error) {
            console.log(error)
        }

        router.push(`/orders/${_id._id}`)
       
    } 

    console.log("idd",ordenP)

    

    



  return (
    <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
        <Typography variant="h1" component='h1'>Dirección</Typography>

        <Grid container spacing={ 2 } sx={{ mt: 2 }}>

            <form onSubmit={handleSubmit}>
            
                <Grid item xs={12} sm={ 20 }>
                    <TextField label='Nombre' variant="filled" fullWidth name="firstName" defaultValue={input.firstName} onChange={(e)=> handleChange(e)} />
                </Grid>
                <Grid item xs={12} sm={ 20 }>
                    <TextField label='Apellido' variant="filled" fullWidth name="lastName" defaultValue={input.lastName} onChange={(e)=> handleChange(e)} />
                </Grid>

                <Grid item xs={12} sm={ 20 }>
                    <TextField label='Dirección' variant="filled" fullWidth name="address" defaultValue={input.address} onChange={(e)=> handleChange(e)} />
                </Grid>

                <Grid item xs={12} sm={ 20 }>
                    <TextField label='Código Postal' variant="filled" fullWidth name="zip" defaultValue={input.zip} onChange={(e)=> handleChange(e)} />
                </Grid>
                <Grid item xs={12} sm={ 20 }>
                    <TextField label='Ciudad' variant="filled" fullWidth name="city" defaultValue={input.city} onChange={(e)=> handleChange(e)} />
                </Grid>
                       
                
                <Grid item xs={12} sm={ 20 }>
                    <TextField label='Pais' variant="filled" fullWidth name="country" defaultValue={input.country} onChange={(e)=> handleChange(e)} />
            
                </Grid>
                <Grid item xs={12} sm={ 20 }>
                    <TextField label='Teléfono' variant="filled" fullWidth name="phone" defaultValue={input.phone} onChange={(e)=> handleChange(e)} />
                </Grid>
            </form>

        </Grid>


        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'  >
            <Button color="secondary" className="circular-btn" size="large" onClick={handleSubmit} >
                Revisar pedido
            </Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage