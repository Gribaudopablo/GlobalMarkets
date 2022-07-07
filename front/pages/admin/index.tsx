import { useState, useEffect, useContext } from 'react';
import useSWR from 'swr';
import { AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';

import { AdminLayout } from '../../components/layouts'
import { Grid, Typography } from '@mui/material'
import { SummaryTile } from '../../components/admin'
import { DashboardSummaryResponse } from '../../interfaces';
import { tesloApi } from '../../api';
import { GetServerSideProps } from 'next';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';



const DashboardPage = (props) => {
    const {user} = useContext(AuthContext);
    const router = useRouter();
    const [refreshIn, setRefreshIn] = useState(30);
    useEffect(() => {
    const interval = setInterval(()=>{
        console.log('Tick');
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
    }, 1000 );
    
      return () => clearInterval(interval)
    }, []);
    return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardOutlined /> }
    >
        
        <Grid container spacing={2}>
            
            <SummaryTile 
                title={ props.ordenes.length }
                subTitle="Ordenes totales"
                icon={ <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ props.ordenes.filter(i=>i.isPaid).length }
                subTitle="Ordenes pagadas"
                icon={ <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ props.ordenes.filter(i=>i.isPaid === false).length }
                subTitle="Ordenes pendientes"
                icon={ <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ props.usuarios.length }
                subTitle="Clientes"
                icon={ <GroupOutlined color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ props.date.length }
                subTitle="Productos"
                icon={ <CategoryOutlined color="warning" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ props.date.filter(i=>i.inStock <= 0).length }
                subTitle="Sin existencias"
                icon={ <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} /> }
            />

            

            <SummaryTile 
                title={ refreshIn }
                subTitle="Actualización en:"
                icon={ <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} /> }
            />

        </Grid>


    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps= async()=>{
    const datos= await fetch(`https://globalmarkets13.herokuapp.com/products`,{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        },
        
    })
    const date= await datos.json()
    const orders= await fetch(`https://globalmarkets13.herokuapp.com/orders/getAllOrders`,{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        },
        
    })
    const ordenes = await orders.json()
    const users= await fetch(`https://globalmarkets13.herokuapp.com/users/user/`,{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        },
        
    })
    const usuarios = await users.json()
    return {props:{date,ordenes,usuarios}}

}

export default DashboardPage


