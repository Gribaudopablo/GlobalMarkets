import type { NextPage } from "next";
import ProductFilter from "../../components/products/ProductsFiltrados";

const WomenPage: NextPage = () => {
    return <ProductFilter filtro={"women"} category={"Moda"} /> 
};

export default WomenPage;
