import Link from "next/link";
import { useState } from "react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import {ShopLayout} from "../../components/layouts/ShopLayout"
import { useRouter } from "next/router";



let inicio:String[] = []
let otro:any[] = []

function FormDeportes() {
const router = useRouter();
  const [input, setInput]= useState({
      title:"",
      description:"",
      images:otro,
      price:"",
      inStock:"",
      caterogiras:["deporte"],
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
    alert("Prodcuto Creado");

}

    


return (
  <div>
      <ShopLayout title="Bienvenidos a la seccion de deportes" pageDescription="Bienvenidos a la seccion de deportes" >
        <Grid>
            <Typography variant="h1" component="h1" textAlign="center" padding={1} >
                Bienvenidos a la seccion de Deportes
            </Typography >
        </Grid>
        <FormControl onSubmit={handleSubmit} sx={{  width:"100%",alignItems:"center" }} >
            <Grid item xs={12} sm={ 10 }>
                
                <TextField label="* Nombre" variant="filled" name='title' defaultValue={input.title} onChange={(e)=> handleChange(e)} ></TextField>
            </Grid>
            <FormControl sx={{ minWidth :180, padding:1,mt:1 }}>
                    <InputLabel sx={{padding:1, mt:1}} > * Tipo de articulo </InputLabel>
                    <Select onChange={(e)=> handleChange(e)} name="gender" label="Tipo de articulo" >                       
                        <MenuItem value="futbol" > Futbol </MenuItem>
                        <MenuItem value="basquetbol" > Basquetbol </MenuItem>
                        <MenuItem value="box"> <Box></Box></MenuItem>
                        
                    </Select>
                </FormControl>

            <Grid    >
                <FormControl sx={{ minWidth :180, padding:1,mt:1 }}>
                    <InputLabel sx={{padding:1, mt:1}} > * Tipo de articulo </InputLabel>
                    <Select onChange={(e)=> handleChange(e)} name="type" label="Tipo de articulo" >
                        <MenuItem value="tablero">Tablero de Basquet </MenuItem>
                        <MenuItem value="balon" > Pelota </MenuItem>
                        <MenuItem value="espinilleras" > Espinilleras </MenuItem>
                        <MenuItem value="bolsas">Mochila deportiva</MenuItem>
                        <MenuItem value="guantes"> Guantes</MenuItem>
                        <MenuItem value="proteccion"> Protecciones </MenuItem>
                        <MenuItem value="costal"> Bolsa de boxeo </MenuItem>                      
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

export default FormDeportes

function secure_url(secure_url: any): React.SetStateAction<any[]> {
  throw new Error('Function not implemented.');
}