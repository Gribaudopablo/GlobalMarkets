import type { NextPage } from 'next';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import Hogar from "../../components/products/ProductHogar";


const MueblesPage: NextPage = () => {

    const { products, isLoading } = useProducts("/products");
    
return (
      <>
        {
          isLoading
          ? <FullScreenLoading />
          : <Hogar filtro='muebles' category='Muebles' productos={ products.filter(i=>i.gender === 'muebles') as any } />
        }
      </>
    )
}
export default MueblesPage