import React from 'react';
import Link from "next/link";
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import BungalowOutlinedIcon from '@mui/icons-material/BungalowOutlined';
import SurfingOutlinedIcon from '@mui/icons-material/SurfingOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import { Grid, Button, Typography, Toolbar} from '@mui/material';
import { Box } from '@mui/system';
import { Icon } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { NextPage } from 'next';



const Form:NextPage =  () => {
return (
    <ShopLayout title='Bienvenido, aqui podras publicar un producto' pageDescription='Formularios para crear productos' >
        <Box  sx={{backgroundColor:'#3D3A3A',textAlign:'center',alignContent:'center',justifyContent:'center'}}>
        <Typography sx={{color:'lightgray'}}  variant='h1' component='h1'>Bienvenido, aqui podras publicar un producto</Typography>

            <Grid item xs={4}>
                <Box sx={{backgroundColor:'lightgray'}}  border={2}>
                    <Link href="formIndumentaria" >
                        <Button 
                            endIcon={<AccessibilityOutlinedIcon></AccessibilityOutlinedIcon>}>
                            Moda
                        </Button>
                    </Link>
                </Box>    
            </Grid>
        <Grid item xs={2}>
                <Box sx={{backgroundColor:'lightgray'}} border={2}>
                    
                        <Link href="formTecnologia">
                            <Button 
                            endIcon={<ComputerOutlinedIcon></ComputerOutlinedIcon>}>                                
                                    Tecnologia                                 
                            </Button>
                            
                        </Link>
                        
                    
                </Box>
            </Grid>
            
            <Grid item xs={2}>
                <Box sx={{backgroundColor:'lightgray'}} border={2}>
                    <Link href="formHogar">
                        <Button 
                        endIcon={<BungalowOutlinedIcon></BungalowOutlinedIcon>}>
                            Hogar
                        </Button>
                    </Link>
                    
                </Box>
            </Grid>
            <Grid item xs={2}>
                    <Box sx={{backgroundColor:'lightgray'}} border={2}>
                        <Link href="formDeporte"> 
                            <Button 
                            endIcon={<SurfingOutlinedIcon></SurfingOutlinedIcon>}>
                                Deportes
                            </Button>
                        </Link>
                        
                    </Box>
                
            </Grid>
    </Box>
</ShopLayout>
  )
};
export default Form;