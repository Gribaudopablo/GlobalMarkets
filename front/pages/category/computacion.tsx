import type { NextPage } from 'next';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import Tecnologia from '../../components/products/ProductTecnologia';


const ComputacionPage: NextPage = () => {

    const { products, isLoading } = useProducts("/products");
    
return (
      <>
        {
          isLoading
          ? <FullScreenLoading />
          : <Tecnologia filtro='computacion' category='Computación' productos={ products.filter(i=>i.gender === 'computacion') as any } />
        }
      </>
    )
}
export default ComputacionPage