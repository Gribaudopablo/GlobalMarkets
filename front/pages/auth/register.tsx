import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../context';
import { tesloApi } from '../../api';
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';


type FormData = {
    name       :string,
    surname    :string,
    Username   :string,
    email      :string,
    password   :string,
    dni        :number,
    age        :number,
    address    :string,
    phoneNumber:number
};


const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext( AuthContext );


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const onRegisterForm = async( {  name, surname, Username, password, email, dni, age, address, phoneNumber}: FormData ) => {
        
        setShowError(false);
        const { hasError, message } = await registerUser( name, surname, Username, password, email, dni, age, address, phoneNumber);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        
        // Todo: navegar a la pantalla que el usuario estaba
        router.push('/');

    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
                <Box sx={{ width: 300, height: 300 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant='h1' component="h1">Crear cuenta</Typography>
                            <Chip 
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />
                        </Grid>

                        <Grid item xs={"auto"}>
                            <TextField
                                label="Nombre"
                                variant="filled"
                                fullWidth 
                                { ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
                            />
                        </Grid>
                        <Grid item xs={"auto"}>
                            <TextField
                                label="Apellido"
                                variant="filled"
                                fullWidth 
                                { ...register('surname', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                            />
                        </Grid>
                        <Grid item xs={"auto"}>
                            <TextField
                                label="Nombre De Usuario"
                                variant="filled"
                                fullWidth 
                                { ...register('Username', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                            />
                        </Grid>
                        <Grid item xs={"auto"}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth 
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>
                        
                        <Grid item xs={"auto"}>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="filled"
                                fullWidth 
                                { ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                    
                                })}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={"auto"}>
                            <TextField
                                label="Nº De Identidad"
                                variant="filled"
                                fullWidth 
                                { ...register('dni', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                            />
                        </Grid>
                        <Grid item xs={"auto"}>
                            <TextField
                                label="Edad"
                                variant="filled"
                                fullWidth 
                                { ...register('age', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                            />
                        </Grid>
                        <Grid item xs={"auto"}>
                            <TextField
                                label="Calle Y Numero"
                                variant="filled"
                                fullWidth 
                                { ...register('address', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                            />
                        </Grid>
                        <Grid item xs={"auto"}>
                            <TextField
                                label="Tel/Cel"
                                variant="filled"
                                fullWidth 
                                { ...register('phoneNumber', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                            />
                        </Grid>
         

                        <Grid item xs={"auto"}>
                            <Button
                                type="submit"
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                fullWidth
                            >
                                Registrar !!!
                            </Button>
                        </Grid>

                        <Grid item xs={"auto"} display='flex' justifyContent='end'>
                            <NextLink href="/auth/login" passHref>
                                <Link underline='always'>
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage