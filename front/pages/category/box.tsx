import type { NextPage } from 'next';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import Deporte from "../../components/products/ProductDeporte";


const BoxPage: NextPage = () => {

    const { products, isLoading } = useProducts("/products");
    
return (
      <>
        {
          isLoading
          ? <FullScreenLoading />
          : <Deporte filtro='box' category='Box' productos={ products.filter(i=>i.gender === 'box') as any } />
        }
      </>
    )
}
export default BoxPage