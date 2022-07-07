import type { NextPage } from 'next';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import Hogar from "../../components/products/ProductHogar";


const CalefaccionPage: NextPage = () => {

    const { products, isLoading } = useProducts("/products");
    
return (
      <>
        {
          isLoading
          ? <FullScreenLoading />
          : <Hogar filtro='calefaccion' category='Calefaccion' productos={ products.filter(i=>i.gender === 'calefaccion') as any } />
        }
      </>
    )
}
export default CalefaccionPage