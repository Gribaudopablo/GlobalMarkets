import { useState, useContext } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { CartContext } from '../../context/cart/CartContext';

import { ShopLayout } from '../../components/layouts';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';

import {  ICartProduct, ISize } from '../../interfaces';


interface Props {
  product: any
}


const ProductPage:NextPage<Props> = (props) => {
  console.log("esto es props:",props);
  
  const router = useRouter();
  const { addProductToCart } = useContext( CartContext )
  
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id:   props.product?._id,
    image: props.product?.images ,
    price: props.product?.price,
    size: undefined,
    slug:  props.product?.slug,
    title: props.product?.title,
    gender:props.product?.gender,
    quantity: 1,
  }) 
  

  const selectedSize = ( size: ISize ) => {
    setTempCartProduct( currentproduct => ({
      ...currentproduct,
      size
    }));
  }

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }


  const onAddProduct = () => {
    
    if(props.product.sizes.length < 1) {
      addProductToCart(tempCartProduct)
      router.push('/cart');
    }
    if ( !tempCartProduct.size ) { return; }
    addProductToCart(tempCartProduct);
    router.push('/cart');
  };
  

  
  return (
    <ShopLayout title={ props.product.title } pageDescription={ props.product.description }>
    
      <Grid container spacing={3}>

        <Grid item xs={12} sm={ 7 }>
          <ProductSlideshow 
            images={ props.product?.images }
          />
        </Grid>

        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1'>{ props.product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${props.product.price}` }</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter 
                currentValue={tempCartProduct.quantity}
                updatedQuantity={ onUpdateQuantity  }
                maxValue={ props.product.inStock > 10 ? 10: props.product.inStock }
              />
              {<SizeSelector 
                // selectedSize={ product.sizes[2] } 
                sizes={ props.product.sizes }
                selectedSize={ tempCartProduct.size }
                onSelectedSize={ selectedSize }
              />}

            </Box>


            {/* Agregar al carrito */}
            {
              (props.product.inStock > 0)
               ? (
                  <Button 
                    color="secondary" 
                    className='circular-btn'
                    onClick={ onAddProduct }
                  >
                    { props.product.sizes.length < 1? 'Agregar al carrito' : 
                        tempCartProduct.size
                        ? 'Agregar al carrito'
                        : 'Seleccione un tamaño'
                    }
                  </Button>
               )
               : (
                 <Chip label="No hay disponibles" color="error" variant='outlined' />
               )
            }
            
            {/* Descripción */}
            <Box sx={{ mt:3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{ props.product.description }</Typography>
            </Box>

          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps= async({req,query})=>{
  console.log("query",query.slug)
  const datos= await fetch(`https://globalmarkets13.herokuapp.com/products/${query.slug}`,{
      method:"GET",
      headers:{
          "Content-type":"application/json"
      },
  })
  const product= await datos.json()
  
  
  
  return {props:{product}}





}

/*
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await fetch("https://globalmarkets13.herokuapp.com/products").then(res=>res.json());


  
  return {
    paths: productSlugs.map( (i:any) => ({
      params: {
        slug : i._id? `${i._id}` : `${i.slug}`
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };
  const prueba = await fetch(`https://globalmarkets13.herokuapp.com/products`).then(res=>res.json());
  const product = prueba.filter((i)=>{
    if(i._id == slug) return i
    else if (i.slug == slug) return i
  })
  if ( !product[0] ) {
    
    return {
      redirect: {
        destination: '/cart',
        permanent: false
      }
    }
  }
  
  return {
    
    props: {
      product
    }
  }
}
*/


  export default ProductPage