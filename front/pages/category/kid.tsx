import type { NextPage } from "next";
import ProductFilter from "../../components/products/ProductsFiltrados";

const KidPage: NextPage = () => {
    return <ProductFilter filtro={"kid"} category={"Moda"} /> 
};

export default KidPage;

