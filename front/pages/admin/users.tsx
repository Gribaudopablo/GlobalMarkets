import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Button, Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {useState, useEffect} from "react"
import { AdminLayout } from '../../components/layouts'
import React,{useContext} from "react"
import {AuthContext} from "../../context/auth/AuthContext"
import { CartContext } from '../../context';
import { useRouter } from 'next/router';

const handleSubmit = async (row)=>{
    try {
        const borrar = await fetch(`https://globalmarkets13.herokuapp.com/users/delete/${row.row.dni}`,{
            method: "DELETE",
            headers:{
                "Content-type":"application/json"
            }
        }).then(r=>r.json());
    } catch (error) {
        console.log(error);
        
    }
};

const changeRole = async (row)=>{
    try {
        const rol = row.row.role === 'client'? 'admin' : 'client'
        const update = await fetch(`https://globalmarkets13.herokuapp.com/users/${row.row.id}`,{
            method: "PUT",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({role:rol})
        }).then(r=>r.json());
    } catch (error) {
        console.log(error);
        
    }
}



const columns:GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'Username', headerName: 'Usuario', width: 250 },
    { field: 'email', headerName: 'E-Mail', width: 300 },
    { field: 'dni', headerName: 'DNI', width: 300 },
    {
        field: 'role',
        headerName: 'Rol',
        renderCell: ({ row }: GridValueGetterParams) => {
            return row.role==="client"
                ? ( <Button onClick={()=>{
                    changeRole({row}).then(()=>location.reload())
                }} variant='outlined'  color="success" >Cliente</Button> )
                : ( <Button onClick={()=>{
                    changeRole({row}).then(()=>location.reload())
                }} variant='outlined'  color="error" >Admin</Button> )
        }
    },
    {
        field: 'check',
        headerName: 'Eliminar',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <Button onClick={()=>{
                    handleSubmit({row}).then(()=>location.reload())
                }} >Eliminar</Button>
            )
        }
    },
];




const OrdersPage = () => {
    const{user,isLoggedIn}=useContext(AuthContext)
    var inicio:any[] = []
    const [users, setUsers]= useState(inicio)
    const router = useRouter();
useEffect(()=>{
    async function fetchData(){
        try {
            const t= await fetch(`https://globalmarkets13.herokuapp.com/users/user/`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            })
            const enviar= await t.json()
            setUsers(enviar) 
        } catch (err) {
            console.log(err);
        }
    }
    if(users.length==0) fetchData();
},[users])


const rows = users.map(p=>{
    return{
        id:p._id,
        Username:p.Username,
        email:p.email,
        dni:p.dni,
        role:p.role,
    }
})


  return (
    <AdminLayout 
        title={'Usuarios'} 
        subTitle={'Mantenimiento de Usuarios'}
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