
import type { NextPage } from 'next';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import Deporte from "../../components/products/ProductDeporte";


const BasquetPage: NextPage = () => {

    const { products, isLoading } = useProducts("/products");
    
return (
      <>
        {
          isLoading
          ? <FullScreenLoading />
          : <Deporte filtro='basquetbol' category='Basquetbol' productos={ products.filter(i=>i.gender === 'basquetbol') as any } />
        }
      </>
    )
}
export default BasquetPage