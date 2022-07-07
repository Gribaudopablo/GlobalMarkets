import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Badge, Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Link, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

import { CartContext, UiContext } from '../../context';

export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext( UiContext );
    const { numberOfItems } = useContext( CartContext );

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }

    

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Global |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Market</Typography>
                    </Link>  
                </NextLink>

                <Box flex={ 1 } />

                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className="fadeIn">
              
              <Button sx={{padding:0.5}} >

              <FormControl sx={{ m: 0, minWidth: 83 }} size="small">
              <InputLabel id="demo-select-small" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Moda</InputLabel>
              <Select
                sx={{borderRadius:10}}
                labelId="demo-select-small"
                id="demo-select-small"
                label="Moda">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <NextLink href='/category/men' passHref>
                  <Link sx={{color:'black'}}>
                    <MenuItem value={10} color = {asPath === '/category/men' ? 'primary' : 'info'}>Hombres</MenuItem>
                  </Link>
                </NextLink>
                <NextLink href='/category/women' passHref>
                  <Link sx={{color:'black'}}>
                    <MenuItem value={10} color = {asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</MenuItem>
                  </Link>
                </NextLink>
                <NextLink href='/category/kid' passHref>
                  <Link sx={{color:'black'}} >
                    <MenuItem value={10} color = {asPath === '/category/kid' ? 'primary' : 'info'}>Niños</MenuItem>
                  </Link>
                </NextLink>
              </Select>
    </FormControl>
    </Button>

    <Button sx={{padding:0.5}}  >

    <FormControl sx={{ m: 0, minWidth: 103 }} size="small">
              <InputLabel id="demo-select-small" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Deporte</InputLabel>
              <Select
                sx={{borderRadius:10}}
                labelId="demo-select-small"
                id="demo-select-small"
                label="Deporte">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <NextLink href='/category/futbol' passHref>
                  <Link sx={{color:'black'}}>
                    <MenuItem value={10} color = {asPath === '/category/futbol' ? 'primary' : 'info'}>Futbol</MenuItem>
                  </Link>
                </NextLink>
                <NextLink href='/category/basquetbol' passHref>
                  <Link sx={{color:'black'}}>
                    <MenuItem value={10} color = {asPath === '/category/basquetbol' ? 'primary' : 'info'}>Basquetbol</MenuItem>
                  </Link>
                </NextLink>
                <NextLink href='/category/box' passHref>
                  <Link sx={{color:'black'}} >
                    <MenuItem value={10} color = {asPath === '/category/box' ? 'primary' : 'info'}>Box</MenuItem>
                  </Link>
                </NextLink>
              </Select>
        </FormControl>
    </Button>
        <Button sx={{padding:0.5}}  >

        <FormControl sx={{ m: 0, minWidth: 125 }} size="small">
              <InputLabel id="demo-select-small" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Tecnologia</InputLabel>
              <Select
                sx={{borderRadius:10}}
                labelId="demo-select-small"
                id="demo-select-small"
                label="Tecnologia">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <NextLink href='/category/dispositivos' passHref>
                  <Link sx={{color:'black'}}>
                    <MenuItem value={10} color = {asPath === '/category/dispositivos' ? 'primary' : 'info'}>Celulares/Smart TV/Tablets</MenuItem>
                  </Link>
                </NextLink>
                <NextLink href='/category/computacion' passHref>
                  <Link sx={{color:'black'}}>
                    <MenuItem value={10} color = {asPath === '/category/computacion' ? 'primary' : 'info'}>Computación</MenuItem>
                  </Link>
                </NextLink>
                <NextLink href='/category/videojuegos' passHref>
                  <Link sx={{color:'black'}} >
                    <MenuItem value={10} color = {asPath === '/category/videojuegos' ? 'primary' : 'info'}>Videojuegos</MenuItem>
                  </Link>
                </NextLink>
              </Select>
        </FormControl>
        </Button>
        <Button sx={{padding:0.5}}  >

        <FormControl sx={{ m: 0, minWidth: 87 }} size="small">
              <InputLabel id="demo-select-small" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Hogar</InputLabel>
              <Select
                sx={{borderRadius:10}}
                labelId="demo-select-small"
                id="demo-select-small"
                label="Hogar">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <NextLink href='/category/muebles' passHref>
                  <Link sx={{color:'black'}}>
                    <MenuItem value={10} color = {asPath === '/category/muebles' ? 'primary' : 'info'}>Muebles</MenuItem>
                  </Link>
                </NextLink>
                <NextLink href='/category/cocina' passHref>
                  <Link sx={{color:'black'}}>
                    <MenuItem value={10} color = {asPath === '/category/cocina' ? 'primary' : 'info'}>Cocina</MenuItem>
                  </Link>
                </NextLink>
                <NextLink href='/category/calefaccion' passHref>
                  <Link sx={{color:'black'}} >
                    <MenuItem value={10} color = {asPath === '/category/calefaccion' ? 'primary' : 'info'}>Calefaccion Y Enfriamento</MenuItem>
                  </Link>
                </NextLink>
                
              </Select>
        </FormControl>
                </Button>
                </Box>


                <Box flex={ 1 } />
                  {
                    isSearchVisible 
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                    : 
                    (
                        <IconButton 
                            onClick={ () => setIsSearchVisible(true) }
                            className="fadeIn"
                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                            <SearchOutlined />
                        </IconButton>
                    )
                }


                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ numberOfItems > 9 ? '+9': numberOfItems  } color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>


                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}