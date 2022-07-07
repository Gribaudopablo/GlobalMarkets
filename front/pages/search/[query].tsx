import type { NextPage, GetServerSideProps,GetStaticPaths,GetStaticProps } from 'next';
import { dbProducts } from '../../database';
import SearchPage1 from '../../components/products/Search';
import { useProducts } from '../../hooks';


interface Props {
    query: string;
};



const SearchPage: NextPage<Props> = ({query}) => {
    const {products} = useProducts('/products');
    const prueba = ()=>{
        const res = products.filter((i:any)=>{
            let tag = Array.isArray(i.tags)? i.tags[0] : i.tags
        if(i.title.toLowerCase().includes(query)) return i;
        else if(i.description.toLowerCase().includes(query)) return i;
        else if(!!i.slug && i.slug.toLowerCase().includes(query)) return i;
        else if(!!i.tags && tag.toLowerCase().includes(query)) return i;
        else if(!!i.gender && i.gender.toLowerCase().includes(query)) return i;
        else if(!!i.types && i.types.toLowerCase().includes(query))return i;
        else if(!!i.caterogiras && i.caterogiras.length > 0 && i.caterogiras[0].toLowerCase().includes(query)) return i
        });
        const ver = res.length > 0
        if(!ver){
            return {
                productos: products.filter((i:any)=>{
                    let tag = Array.isArray(i.tags)? i.tags[0] : i.tags
                if(i.title.toLowerCase().includes("juegos")) return i;
                else if(i.description.toLowerCase().includes("juegos")) return i;
                else if(!!i.slug && i.slug.toLowerCase().includes("juegos")) return i;
                else if(!!i.tags && tag.toLowerCase().includes("juegos")) return i;
                else if(!!i.gender && i.gender.toLowerCase().includes("juegos")) return i;
                else if(!!i.types && i.types.toLowerCase().includes("juegos"))return i;
                else if(!!i.caterogiras && i.caterogiras.length > 0 && i.caterogiras[0].toLowerCase().includes("juegos")) return i
                }),
                ver
            }
        }
        return {
            productos:res,
            ver
        }
    };
    
    return (
        <SearchPage1 query={query} products={prueba().productos} foundProducts={prueba().ver} />
    )
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };
    
    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
    return {
        props: {
            query
        }
    }
}

export default SearchPage;
