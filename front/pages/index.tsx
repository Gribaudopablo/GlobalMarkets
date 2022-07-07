import type { NextPage } from "next";
import { Pagination, Stack, Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";
import { FullScreenLoading } from "../components/ui";
import {  useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import {getSession, useSession} from 'next-auth/react'
import { useRouter } from "next/router";
import { AuthContext } from "../context";


const inicio : any = {
  login:false,
  email:"algo"
}
const HomePage: NextPage = () => {
  const {data:session,status} = useSession();
  const { products, isLoading } = useProducts("/products/");
  const [contador, setContador] = useState(1);
  const [page,setPage ]= useState(0);
  const [page1,setPage1] = useState(1);
  const { isLoggedIn } = useContext(AuthContext);
  const [login,setLogin] = useState(inicio);
  
  useEffect(()=>{
    (async ()=>{
      const user = await getSession();
      if(user){
        setLogin(prev=>{
           prev.login = true
           prev.email = user.user?.email
           return prev
        })
      }
    })();
    
  },[]);
  

  const next = ()=>{
        if(products.length > page + 18){
            setPage(prev=>prev+18);
        }
    }
    const prev = ()=>{
        if(0 < page){
            setPage(pre=>pre-18);
        }
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {        
      setPage1(value);
      if(contador < value) {
          let count = value - contador
          while(count > 0){
              next()
              count--
          }
      }
      else if (contador > value){
          let count = contador - value
          while(count > 0){
              prev()
              count--
          }
      }
      setContador(value);
    };
  return (
    <ShopLayout
      title={"Global-Market - Home"}
      pageDescription={"Encuentra los mejores productos de Global-Market aquí"}>
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products.slice(page, page + 18) as any} />
      )}
      <br />
      <Stack sx={{textAlign:'center'}} spacing={2}>
            <Pagination sx={{alignSelf:"center"}} variant="outlined" size="large" color="secondary" count={Math.ceil(products.length / 18)}  page={page1} onChange={handleChange}/>
            <Typography>Pagina: {page1} de {Math.ceil(products.length / 18)}</Typography>
        </Stack>
    </ShopLayout>
  );
};
export default HomePage;