import React,{useContext} from "react"
import {AuthContext} from "../../context/auth/AuthContext"
import {useState, useEffect} from "react"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography,Checkbox,FormControlLabel,Link } from "@mui/material" 
import { ShopLayout } from '../../components/layouts/ShopLayout';
import {AdminLayout} from "../../components/layouts/AdminLayout"
import NextLink from 'next/link';
import { PeopleOutline } from '@mui/icons-material'
import { useRouter } from 'next/router'


var inicio:any[] = []


const UserPage = () => {

  const router= useRouter()


  const{user,isLoggedIn}=useContext(AuthContext)
        
  const User= user?.Username


const [users, setUsers]= useState(inicio);



useEffect(()=>{
  async function fetchData(){
      try {
          const t= await fetch(`https://globalmarkets13.herokuapp.com/users/name`,{
              method:"POST",
              headers:{
                  "Content-type":"application/json"
              },
              body:JSON.stringify({Username:User})
          })
          const enviar= await t.json()
          setUsers(enviar)
          console.log("orders",enviar) 

      } catch (err) {
          console.log(err);
      }
      
  }
  if(users.length === 0){
    fetchData();
}
},[users])

const [input, setInput]= useState({
  name:"",
  surname:"",
  age:"",
  address:"",
  Username:"",
  phoneNumber:""
})

const handleChange= (e:any)=>{
  const {value, name}= e.target
  setInput({
      ...input,
      [name]: value

  })
}

const handleSubmit= (e:any)=>{
  e.preventDefault()
  if(!input.name||
      !input.surname||
      !input.age||
      !input.phoneNumber||
      !input.Username||
      !input.address  
      ){
       alert("campos requeridos")
     } 
     else{editar(input)}
}
const editar= async(input:any)=>{
  try{
    const ed= await fetch(`https://globalmarkets13.herokuapp.com/users/${users[0]?._id}`,{
      method:"PUT",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify(input)
    })
    const edit= await ed.json()
    alert("cambios efectuados")
    router.push(`/`)
    
  }
  catch(err){console.log(err)}
}

console.log("input",input)
console.log("user",users)

    
  return (
    <ShopLayout title="User" pageDescription="Datos de Usuario">
    <AdminLayout 
    title={'Usuario'} 
    subTitle={'Datos de Usuario'}
    icon={ <PeopleOutline /> } >

    <FormControl onSubmit={handleSubmit} >

   
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            INFORMACION DE USUARIO
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <Typography variant="inherit" gutterBottom>
            Nombre:
            </Typography>
              <TextField
                required
                id="name"
                name="name"
                label= {users[0]?.name}
                fullWidth
                autoComplete="hola"
                defaultValue={input.name}
                onChange={(e)=> handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography variant="inherit" gutterBottom>
            Apellido:
            </Typography>
              <TextField
                required
                id="surname"
                name="surname"
                label={users[0]?.surname}
                fullWidth
                autoComplete="family-name"
                defaultValue={input.surname}
                onChange={(e)=> handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
            <Typography variant="inherit" gutterBottom>
            Email:
            </Typography>
              <TextField
                required
                id="email"
                name="email"
                label={users[0]?.email}
                fullWidth
                autoComplete="shipping address-line1"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} >
            <Typography variant="inherit" gutterBottom>
            Numero de identificacion:
            </Typography>
              <TextField
                id="dni"
                name="dni"
                label={users[0]?.dni}
                fullWidth
                autoComplete="shipping address-line2"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography variant="inherit" gutterBottom>
            Edad:
            </Typography>
              <TextField
                required
                id="age"
                name="age"
                label= {users[0]?.age}
                fullWidth
                autoComplete="shipping address-level2"
                defaultValue={input.age}
                onChange={(e)=> handleChange(e)}
                type="number"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <Typography variant="inherit" gutterBottom>
            Domicilio:
            </Typography>
              <TextField
                required
                id="address"
                name="address"
                label={users[0]?.address}
                fullWidth
                autoComplete="shipping postal-code"
                defaultValue={input.address}
                onChange={(e)=> handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography variant="inherit" gutterBottom>
            Telefono:
            </Typography>
              <TextField
                required
                id="phoneNumber"
                name="phoneNumber"
                label={users[0]?.phoneNumber}
                fullWidth
                autoComplete="shipping country"
                defaultValue={input.phoneNumber}
                onChange={(e)=> handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <Typography variant="inherit" gutterBottom>
            Nombre de usuario:
            </Typography>
              <TextField
                required
                id="Username"
                name="Username"
                label={users[0]?.Username}
                fullWidth
                autoComplete="shipping country"
                defaultValue={input.Username}
                onChange={(e)=> handleChange(e)}
              />
            </Grid>
            <Box sx={{ mt: 5 }} display='flex' justifyContent='center' >
                <Button color="secondary" className="circular-btn" size="large" onClick={handleSubmit} > Editar</Button>
            </Box>
            <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href="https://globalmarkets13.herokuapp.com/users/users/password-reset" passHref>
                                <Link underline='always'>
                                    Reset Password
                                </Link>
                            </NextLink>
                        </Grid>
            
          </Grid>
        </React.Fragment>
        </FormControl>
        </AdminLayout>
        </ShopLayout>
      );
    }



export default UserPage