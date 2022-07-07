import NextLink from 'next/link';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import {AuthContext} from "../../context/auth/AuthContext"
import React,{useContext} from "react"
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'

import {useState, useEffect} from "react"
import { CartContext } from '../../context';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firtsName', headerName: 'Nombre ', width: 300 },
    { field: 'lastName', headerName: 'apellido', width: 300 },

    {
        field: 'isPaid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden o no',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.isPaid
                    ? <Chip color="success" label="Pagada" variant='outlined' />
                    : <Chip color="error" label="No pagada" variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
               <NextLink href={`/orders/${ params.row.id }`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
               </NextLink>
            )
        }
    }
];

const inicio: any[] = []

const HistoryPage =  () => {
    const{user,isLoggedIn}=useContext(AuthContext)
    const{cart} = useContext(CartContext);
        const userId= user?.email
    const router= useRouter()
//    if (isLoggedIn===false){router.push("/")}


    const [orders, setOrders]= useState(inicio)
   
    

    useEffect(()=>{
        async function fetchData(){
            try {
                const t= await fetch(`https://globalmarkets13.herokuapp.com/orders/getAll`,{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify({userId:userId})
                })
                var enviar= await t.json()
                setOrders(enviar)
            } catch (err) {
                console.log(err);
            }
            
        }
        if(orders.length === 0){
            fetchData();
        }
    },[orders])

  


   
    const rows=orders.map(p=>{
        return{
            id:p._id,
            firtsName:p.shippingAddress?.firstName,
            lastName:p.shippingAddress?.lastName,
            isPaid:p.isPaid
        }
    })

    const result = orders.filter(p=> p.paypalId && p.isPaid===false);

    let array= result.map(async p =>{
        try{
            const r= await fetch(`https://globalmarkets13.herokuapp.com/paypal/getDataOrderById/${p.paypalId}`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            })
            const r2= await r.json()

            if(r2.status==="COMPLETED"){
                    const q= await fetch(`https://globalmarkets13.herokuapp.com/orders/${p._id}`,{
                        method:"PUT",
                        headers:{
                            "Content-type":"application/json"
                        },
                        body: JSON.stringify({isPaid:true,email:p.userId})
                    })
            p.orderItems?.map(async (t:any)=>{
                                const product= await fetch(`https://globalmarkets13.herokuapp.com/products/${t._id}`,{
                                    method:"GET",
                                    headers:{
                                        "Content-type":"application/json"
                                    },
        
                                }).then(r=>r.json());
                                var nvoStock= product.inStock - (t.quantity);
                                console.log("stock", nvoStock)
                                const i= await fetch(`https://globalmarkets13.herokuapp.com/products/${t._id}`,{
                            method:"PUT",
                            headers:{
                                "Content-type":"application/json"
                            },
                            body: JSON.stringify({inStock:nvoStock})
                        })
                        })
            }
        }
        catch(err) {
            console.log(err)
        } 
    })

  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
        


        <Grid container>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>

    </ShopLayout>
  )
}


export const datoss= async(userId)=>{

   

    const datos= await fetch(`https://globalmarkets13.herokuapp.com/orders/getAll  `,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({userId:userId})
        
    })
    const date= await datos.json()
    
    
    

    

}





export default HistoryPage