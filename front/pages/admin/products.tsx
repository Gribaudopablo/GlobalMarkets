
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Box, Button, Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useState, useEffect} from "react"
import { AdminLayout } from '../../components/layouts'
import React,{useContext} from "react"
import {AuthContext} from "../../context/auth/AuthContext"
import { useRouter } from 'next/router';

const handleSubmit = async (row)=>{
    try {
        
        const borrar = await fetch(`https://globalmarkets13.herokuapp.com/products/${row.row.id}`,{
            method: "DELETE",
            headers:{
                "Content-type":"application/json"
            }
        }).then(r=>r.json());
    } catch (error) {
        console.log(error);
        
    }
}

const columns:GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'inStock', headerName: 'Stock', width: 100 },
    { field: 'title', headerName: 'Nombre', width: 300 },
    { field: 'price', headerName: 'Precio Unidad', width: 150 },
    { field: 'gender', headerName: 'Genero', align: 'center', width: 150 },
    { field: 'category', headerName: 'Categoria', align: 'center', width: 150 },
    {
        field: 'check',
        headerName: 'Editar',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <a href={ `/admin/products/${row.category}/${row.id}` } >
                    Editar
                </a>
            )
        }
    },{
        field: 'check2',
        headerName: 'Eliminar',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <Button onClick={()=>{
                    handleSubmit({row}).then(()=>location.reload())
                }} >Eliminar </Button>
            )

        }
    }
];




const OrdersPage = () => {
    var inicio:any[] = []
    const [orders, setOrders]= useState(inicio)


useEffect(()=>{
    async function fetchData(){
        try {
            const t= await fetch(`https://globalmarkets13.herokuapp.com/products/`,{
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
    if(orders.length === 0) {
        fetchData();
    }
},[orders]);


const rows = orders.map(p=>{
    return{
        id:p._id,
        inStock:p.inStock,
        title:p.title,
        price:p.price,
        gender:p.gender,
        category:p.caterogiras,

    }
})


  return (
    <AdminLayout 
        title={'Productos'} 
        subTitle={'Mantenimiento de productos'}
        icon={ <ConfirmationNumberOutlined /> }
    >
        <Button  color='secondary' variant='outlined' href='/formulario/form'>Crear un Producto</Button>
        <br />
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