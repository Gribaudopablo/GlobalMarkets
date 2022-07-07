import type { NextPage, GetServerSideProps,GetStaticPaths,GetStaticProps } from 'next';
import { Typography,Box } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { IProduct } from '../../interfaces';
import { dbProducts } from '../../database';


const SearchPage1 = ({ products, foundProducts, query }) => {
    return (
        <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
            <Typography variant='h1' component='h1'>Buscar productos</Typography>
            {
                foundProducts 
                    ? <Typography variant='h2' sx={{ mb: 1 }} textTransform="capitalize">Tu búsqueda: { query }</Typography>
                    : (<>
                        <Box display='flex'>
                            <Typography variant='h2' sx={{ mb: 1 }}>No encontramos ningún produto</Typography>
                            <Typography variant='h2' sx={{ ml: 1 }} color="secondary" textTransform="capitalize">{ query }</Typography>
                        </Box>
                        <Box display='flex'>
                            <Typography variant='h2' sx={{ mb: 1 }}>Productos sugeridos: </Typography>
                        </Box>
                            
                        </>)
            }
            <ProductList products={ products } />
        </ShopLayout>
    )
};

export default SearchPage1; 






