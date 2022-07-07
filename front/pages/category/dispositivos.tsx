import type { NextPage } from 'next';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import Tecnologia from '../../components/products/ProductTecnologia';


const DispositivosPage: NextPage = () => {

    const { products, isLoading } = useProducts("/products");
    
return (
      <>
        {
          isLoading
          ? <FullScreenLoading />
          : <Tecnologia filtro='dispositivos' category='Dispositivos' productos={ products.filter(i=>i.gender === 'dispositivos') as any } />
        }
      </>
    )
}
export default DispositivosPage

