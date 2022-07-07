import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import {ShopLayout} from "../../../../components/layouts/ShopLayout"
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { useController } from "react-hook-form";
import { AuthContext } from "../../../../context";



let inicio:String[] = []
let otro:any[] = []

function FormDeportes({date}) {
    const router = useRouter();
    const {user} = useContext(AuthContext);

    
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
          
          const res= await fetch(`https://globalmarkets13.herokuapp.com/products/${date._id}`,{
              method:"PUT",
              headers:{
                  "Content-type":"application/json"
              },
              body: JSON.stringify(input)
          }); 
          const data= await res.json()
          router.push('/admin/products')
      } catch(error){
          console.log(error)
      }


  }
 
    


  return (
    <div>
        <ShopLayout title="Bienvenidos a la seccion de deportes" pageDescription="Bienvenidos a la seccion de deportes" >
          <Grid>
              <Typography variant="h1" component="h1" textAlign="center" padding={1} >
                Editar
              </Typography >
          </Grid>
          <FormControl onSubmit={handleSubmit} sx={{  width:"100%",alignItems:"center" }} >
              <Grid item xs={12} sm={ 10 }>
                  
                  <TextField label="* Nombre" variant="filled" name='title' defaultValue={input.title} onChange={(e)=> handleChange(e)} ></TextField>
              </Grid>
              <FormControl sx={{ minWidth :180, padding:1,mt:1 }}>
                      <InputLabel sx={{padding:1, mt:1}} > * Categoria </InputLabel>
                      <Select onChange={(e)=> handleChange(e)} name="gender" label="Tipo de articulo" >                       
                          <MenuItem value="futbol" > Futbol </MenuItem>
                          <MenuItem value="basquetbol" > Basquetbol </MenuItem>
                          <MenuItem value="box">Box</MenuItem>
                          
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
                  <Button color="secondary" className="circular-btn" size="large" onClick={handleSubmit} > Editar</Button>
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

export default FormDeportes

function secure_url(secure_url: any): React.SetStateAction<any[]> {
  throw new Error('Function not implemented.');
}

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