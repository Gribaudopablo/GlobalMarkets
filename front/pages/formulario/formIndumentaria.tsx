import React from 'react'
import Link from "next/link";
import {useState} from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import {ShopLayout} from "../../components/layouts/ShopLayout"
import { useRouter } from 'next/router';




let inicio:String[] = []
let otro:any[] = []
function FormIndumentaria() {
  const router = useRouter();
  const [input, setInput]= useState({
    title:"",
    description:"",
    images:otro,
    price:"",
    inStock:"",
    caterogiras:["moda"],
    type: "",
    sizes:[],
    gender:"",
    

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
        !input.type||
        !input.price||
        !input.inStock){
        alert("* parametro requerido")
    }else{postData(input)}
    
}
const postData= async(input:any)=>{
    try{
        console.log("esto es el input",input);
        console.log("esto es image",image);
        
        const res= await fetch("https://globalmarkets13.herokuapp.com/products",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(input)
        })
        const data= await res.json()
        console.log(data,"data de deporte")

    } catch(error){
        console.log(error)
    }
        alert('Producto Creado');

}
  
  return (
    <div>
        <ShopLayout title="Bienvenidos a la seccion de indumentaria" pageDescription="Bienvenidos a la seccion de indumentaria" >
       
        <FormControl onSubmit={handleSubmit} sx={{  width:"100%",alignItems:"center" }} >
            <Grid item xs={12} sm={ 10 }>             
                <TextField label="* Nombre" variant="filled" name='title' defaultValue={input.title} onChange={(e)=> handleChange(e)} ></TextField>
            </Grid>
            <Grid    >
                <FormControl sx={{ minWidth :180, padding:1,mt:1 }}>
                    <InputLabel sx={{padding:1, mt:1}} > * Genero </InputLabel>
                    <Select onChange={(e)=> handleChange(e)} name="gender" label="Genero" >
                        <MenuItem value="men">Hombre </MenuItem>
                        <MenuItem value="women" > Mujer </MenuItem>
                        <MenuItem value="kid" > Niños </MenuItem>                       
                    </Select>
                </FormControl>
            </Grid >
            <Grid    >
                <FormControl sx={{ minWidth :180, padding:1,mt:1 }}>
                    <InputLabel sx={{padding:1, mt:1}} > * Tipo de articulo </InputLabel>
                    <Select onChange={(e)=> handleChange(e)} name="type" label="Tipo de articulo" >
                        <MenuItem value="Todas las catergorias">Todas las categorias </MenuItem>
                        <MenuItem value="Remera" > Remera </MenuItem>
                        <MenuItem value="Campera" > Campera </MenuItem>
                        <MenuItem value="Sweater" > Sweater</MenuItem>
                        <MenuItem value="Pantalon" > Pantalon</MenuItem>
                    </Select>
                </FormControl>
            </Grid >
            <Grid item xs={12} sm={ 10 } sx={{mt:1}} >
                
                <TextField label="* Descripcion" variant="filled" type="text" name='description' defaultValue={input.description} onChange={(e)=> handleChange(e)} />
            </Grid>
            <Grid item xs={12} sm={ 10 } sx={{mt:1}}>
                
                <TextField label="* Precio" variant="filled" type="text" name='price' defaultValue={input.price} onChange={(e)=> handleChange(e)} />
            </Grid>
            <Grid    >
                <FormControl sx={{ minWidth :180, padding:1,mt:1 }}>
                    <InputLabel sx={{padding:1, mt:1}} > * Tipo de articulo </InputLabel>
                    <Select onChange={(e)=> handleChange(e)} name="sizes" label="Tallas" >
                        
                        <MenuItem value="XS" > xs </MenuItem>
                        <MenuItem value="S" > s </MenuItem>
                        <MenuItem value="M" > m</MenuItem>
                        <MenuItem value="L"> l</MenuItem>
                        <MenuItem value="XL">xl</MenuItem>
                        <MenuItem value="XXL">xxl</MenuItem>
                        <MenuItem value="XXXL">xxxl</MenuItem>
                        <MenuItem value="XXXXL">xxxxl</MenuItem>
                    </Select>
                </FormControl>
            </Grid >
            <Grid item xs={12} sm={ 10 } sx={{mt:1}}>
                
                <TextField label="* Stock" type="number" variant="filled" name='inStock'  InputProps={{ inputProps: { min: 0 } }} defaultValue={input.inStock} onChange={(e)=> handleChange(e)} />
            </Grid>
            <Grid item xs={12} sm={ 10 } sx={{mt:1}}>
                <Typography variant="h6" component="h6"> * imagen: </Typography> 
                
                <TextField  variant="filled" type="file" name='images' defaultValue={input.images}  onChange={(e)=>subirImagen(e)} />
            </Grid>
            <Box sx={{ mt: 5 }} display='flex' justifyContent='center' >
                <Button color="secondary" className="circular-btn" size="large" onClick={handleSubmit} > Crear</Button>
            </Box>
            <Box sx={{ mt: 5 }} display='flex' >
                <Link href="/">
                    <Button color="secondary" size="large"  className="circular-btn" > HOME </Button  >
                </Link>

            </Box >
          </FormControl> 
         
        </ShopLayout>  

    </div>
    

  )
}

export default FormIndumentaria