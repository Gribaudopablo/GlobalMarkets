import type { NextPage } from 'next';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import Deporte from "../../components/products/ProductDeporte";


const FutPage: NextPage = () => {

    const { products, isLoading } = useProducts("/products");
    
return (
      <>
        {
          isLoading
          ? <FullScreenLoading />
          : <Deporte filtro='futbol' category='Futbol' productos={ products.filter(i=>i.gender === 'futbol') as any } />
        }
      </>
    )
}
export default FutPage