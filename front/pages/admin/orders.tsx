
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import {useState, useEffect} from "react"
import { AdminLayout } from '../../components/layouts'
import { IOrder, IUser } from '../../interfaces';
import React,{useContext} from "react"
import {AuthContext} from "../../context/auth/AuthContext"
import { useRouter } from 'next/router';


const columns:GridColDef[] = [
    { field: 'id', headerName: 'Orden ID', width: 250 },
    { field: 'userId', headerName: 'Correo', width: 250 },
    { field: 'firstName', headerName: 'Nombre', width: 300 },
    { field: 'total', headerName: 'Monto total', width: 300 },
    {
        field: 'isPaid',
        headerName: 'Pagada',
        renderCell: ({ row }: GridValueGetterParams) => {
            return row.isPaid
                ? ( <Chip variant='outlined' label="Pagada" color="success" /> )
                : ( <Chip variant='outlined' label="Pendiente" color="error" /> )
        }
    },
    { field: 'noProducts', headerName: 'No.Productos', align: 'center', width: 150 },
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <a href={ `/admin/orders/${ row.id }` } >
                    Ver orden
                </a>
            )
        }
    },
];




const OrdersPage = () => {

    const{user,isLoggedIn}=useContext(AuthContext)
    var inicio:any[] = []
    const [orders, setOrders]= useState(inicio)
    const router = useRouter();
useEffect(()=>{
    async function fetchData(){
        try {
            const t= await fetch(`https://globalmarkets13.herokuapp.com/orders/getAllOrders`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            })
            const enviar= await t.json()
            setOrders(enviar) 
        } catch (err) {
            console.log(err);
        }
    }
    if(orders.length===0){
        fetchData();
    } 
},[orders])


const rows = orders.map(p=>{
    return{
        id:p._id,
        userId:p.userId,
        firstName:p.shippingAddress.firstName,
        total:p.total,
        isPaid:p.isPaid,
        noProducts:p.numberOfItems,

    }
})


  return (
    <AdminLayout 
        title={'Ordenes'} 
        subTitle={'Mantenimiento de ordenes'}
        icon={ <ConfirmationNumberOutlined /> }
    >
         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>
        
    </AdminLayout>
  )
}

export default OrdersPage