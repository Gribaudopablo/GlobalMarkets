import { FC, useContext, useMemo, useState } from "react";
import NextLink from "next/link";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
  Button,
  Chip,
  IconButton,
} from "@mui/material";

import { ICartProduct, IProduct, ISize } from "../../interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import { CartContext } from "../../context";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { SizeSelector } from "./SizeSelector";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [select, setSelect] = useState(false);
  const [change,setChange ] = useState(false);
  const {addProductToCart} = useContext(CartContext);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images ,
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  }) 
  const [isHovered, setIsHovered] = useState(false);
  const onAddProduct = () => {
    
    if(product.sizes.length < 1) {
      addProductToCart(tempCartProduct)
      router.push('/cart');
    }
    if ( !tempCartProduct.size ) { return; }
    addProductToCart(tempCartProduct);
    router.push('/cart');
  };
  const selectedSize = ( size: ISize ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }));
  };
  const productImage = useMemo(() => {
    if (product._id) {
      return isHovered
        ? product.images[0]
        : !!product.images[1]
        ? product.images[1]
        : product.images[0];
    }
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHovered, product._id, product.images]);
  const details = product._id ? product._id : product.slug;
  const myLoader: any = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <Grid
      item
      xs={6}
      sm={4}
      sx={{marginTop:4,boxShadow:2,borderRadius:4,}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Card>
        <NextLink href={`/product/${details}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              <Image
                loader={myLoader}
                src={productImage}
                alt="imagenes de los productos"
                width={400}
                height={500}
                priority={true}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
        {
              (product.inStock > 0)
              ? (
                  <>
                  {
                  select? (
                    <>
                    <Chip sx={{marginLeft:0.6}} label="Escoje un tamaño" color="error" variant='outlined'/>
                    <Button onClick={()=>setSelect(!select)} >
                    <SizeSelector
                    sizes={ product.sizes }
                    selectedSize={ tempCartProduct.size }
                    onSelectedSize={ selectedSize }
                    />
                    </Button>
                    </>
                  ):(
                    <IconButton onClick={()=>{
                      if(product.sizes.length < 1){
                      onAddProduct()
                      
                    } else if(tempCartProduct.size){
                      onAddProduct()
                      
                    } else if(!tempCartProduct.size){
                      setSelect(!select);
                    }
                  }} sx={{marginLeft:0.6}}  aria-label="add to shopping cart">
                      <Typography variant="h6">Agregar</Typography><AddShoppingCartOutlined fontSize="large" color="secondary" sx={{height:0.5}}/>
                      </IconButton>
                  )
                  }
                  </>
              )
              : (
                <Chip sx={{marginLeft:0.6}}  label="No hay disponibles" color="error" variant='outlined' />
              )
              }
              {tempCartProduct.size?<>
              {`Tu tamaño: ${tempCartProduct.size}`}
              <Button sx={{color:'blue'}} onClick={()=>setChange(!change)} >cambiar tamaño</Button>
              </>: null}
              {change? <Button onClick={()=>setChange(!change)} >
                    <SizeSelector 
                    sizes={ product.sizes }
                    selectedSize={ tempCartProduct.size }
                    onSelectedSize={ selectedSize } />
                    </Button> : null
              }
      <Box  className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}
        </Typography>
      </Box>
    </Grid>
  );
};
