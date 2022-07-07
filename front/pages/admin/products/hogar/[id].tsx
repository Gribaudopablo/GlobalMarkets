import React,{useState,useEffect, useContext} from 'react'
import Link from "next/link";
import {ShopLayout} from "../../../../components/layouts/ShopLayout"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../../context';




let inicio:String[] = []
let otro:any[] = []
function FormMuebles({date}) {
    const router = useRouter();
    const {user} = useContext(AuthContext);

    
    const [input, setInput]= useState({
        title:"",
        description:"",
        images:otro,
        price:"",
        inStock:"",
        caterogiras:["hogar"],
        type: "",
        gender:""
        
  
    })
    const [image,setImage]= useState(inicio);
    const [loading,setLoading]= useState(false)
    
  
    const subirImagen= async (e:any) =>{
        
        const files= e.target.files;
        const data= new FormData();
        data.append("file",files[0]);
        data.append("upload_preset","wpcczfle");
        
        setLoading(true);
        const res = await fetch("https://api.cloudinary.com/v1_1/dlbvte7sp/image/upload",
                                {
                                  method:"POST",
                                  body:data,  
                                })
                    const file= await res.json();
                    let prueba:String[] = [];
                    prueba.push(file.secure_url);
                    setInput(prev=>{
                      return {
                          ...prev,
                          images: prueba
                      }
                      });
    } 
  
  
    const handleChange= (e:any)=>{
        const {value, name}= e.target
        setInput({
            ...input,
            [name]: value
  
        })
    }
    const handleSubmit= (e:any)=>{
        e.preventDefault();
        if(!input.title||
            !input.description||
            !input.type||
            !input.price||
            !input.inStock){
            alert("* parametro requerido")
        }else{postData(input)}
        
    }
    const postData= async(input:any)=>{
        try{

            
            const res= await fetch("https://globalmarkets13.herokuapp.com/products",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify(input)
            })
            const data= await res.json()
            router.push('/admin/products')
        } catch(error){
            console.log(error)
        }
  
  
    }
   
      
  

    return (
        <div>
            <ShopLayout title="Editar" pageDescription="Editar" >
            <Grid>
                <Typography variant="h1" component="h1" textAlign="center" padding={1} >
                    Editar 
                </Typography >
            </Grid>
            
        
            <FormControl onSubmit={handleSubmit} sx={{  width:"100%",alignItems:"center" }} >
    
                <Grid item xs={12} sm={ 10 }>
                    
                    <TextField label="* Nombre" variant="filled" name='title' defaultValue={input.title} onChange={(e)=> handleChange(e)} ></TextField>
                </Grid>
                <Grid    >
                    <FormControl sx={{ minWidth :180, padding:1,mt:1 }}>
                        <InputLabel sx={{padding:1, mt:1}} > * Categoria </InputLabel>
                        <Select onChange={(e)=> handleChange(e)} name="gender" label="Genero" >
                            <MenuItem value="muebles">Muebles </MenuItem>
                            <MenuItem value="cocina " > Cocina </MenuItem>
                            <MenuItem value="calefaccion" > Calefaccion y enfriamiento </MenuItem>                       
                        </Select>
                    </FormControl>
                </Grid>    
                <Grid    >
                    <FormControl sx={{ minWidth :180, padding:1,mt:1 }}>
                        <InputLabel sx={{padding:1, mt:1}} > * Tipo de articulo </InputLabel>
                        <Select onChange={(e)=> handleChange(e)} name="type" label="Tipo de articulo" >
                            <MenuItem value="sofa"> Sofa </MenuItem>
                            <MenuItem value="juegos de vajilla" > juego de  vajilla </MenuItem>
                            <MenuItem value="utensillos" > utensillos </MenuItem>
                            <MenuItem value="cama"> Camas</MenuItem>
                            <MenuItem value="escritorio"> Escritorio</MenuItem>
                            <MenuItem value="juego de comedor"> Juego de comedor </MenuItem>
                            <MenuItem value="cristaleria"> Cristaleria </MenuItem>
                            <MenuItem value="ventiladores">Ventiladores </MenuItem>
                            <MenuItem value="aire aacondicionado"> Aires acondicionados </MenuItem>
                            <MenuItem value="calentadores"> Calentadores </MenuItem>
                            <MenuItem value="chimenea"> Chimenea </MenuItem>
                        </Select>
                    </FormControl>
                </Grid >
                <Grid item xs={12} sm={ 10 } sx={{mt:1}} >
                    
                    <TextField label="* Descripcion" variant="filled" type="text" name='description' defaultValue={input.description} onChange={(e)=> handleChange(e)} />
                </Grid>
                <Grid item xs={12} sm={ 10 } sx={{mt:1}}>
                    
                    <TextField label="* Precio" variant="filled" type="text" name='price' defaultValue={input.price} onChange={(e)=> handleChange(e)} />
                </Grid>
                <Grid item xs={12} sm={ 10 } sx={{mt:1}}>
                    
                    <TextField label="* Stock" type="number" variant="filled" name='inStock'  InputProps={{ inputProps: { min: 0 } }} defaultValue={input.inStock} onChange={(e)=> handleChange(e)} />
                </Grid>
                <Grid item xs={12} sm={ 10 } sx={{mt:1}}>
                    <Typography variant="h6" component="h6"> * imagen: </Typography> 
                    
                    <TextField  variant="filled" type="file" name='images' defaultValue={input.images}  onChange={(e)=>subirImagen(e)} />
                </Grid>
                <Box sx={{ mt: 5 }} display='flex' justifyContent='center' >
                    <Button color="secondary" className="circular-btn" size="large" onClick={handleSubmit} >Editar</Button>
                </Box>
                <Box sx={{ mt: 5 }} display='flex' >
                    <Link href="/admin/products">
                        <Button color="secondary" size="large"  className="circular-btn" > Volver </Button  >
                    </Link>
    
                </Box >
            
            </FormControl>
            </ShopLayout>
        </div>
        
      )
}

export default FormMuebles

export const getServerSideProps: GetServerSideProps= async({req,query})=>{
    console.log("query",query.id)
    const datos= await fetch(`https://globalmarkets13.herokuapp.com/products/${query.id}`,{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        },
        
    })
    const date= await datos.json()
    
    return {props:{date}}

}