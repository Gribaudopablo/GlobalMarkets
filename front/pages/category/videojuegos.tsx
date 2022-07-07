import type { NextPage } from 'next';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import Tecnologia from '../../components/products/ProductTecnologia';


const VideojuegosPage: NextPage = () => {

    const { products, isLoading } = useProducts("/products");
    
return (
      <>
        {
          isLoading
          ? <FullScreenLoading />
          : <Tecnologia filtro='videojuegos' category='Videojuegos' productos={ products.filter(i=>i.gender === 'videojuegos') as any } />
        }
      </>
    )
}
export default VideojuegosPage

