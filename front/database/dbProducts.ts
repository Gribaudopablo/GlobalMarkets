import { db } from "./";
import * as models from "../models";
import { IProduct } from "../interfaces";

export const getProductBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await models.Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}
export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await models.Product.find().select("slug -_id").lean();
  await db.disconnect();

  return slugs;
};

export const getProductsByTerm = (term: string): any[] => {
  term = term.toString().toLowerCase();
  
    /*let response = await fetch('https://globalmarkets.herokuapp.com/products').then(res=>res.json());*/
    let response = [{_id: "62b3eada7a13eb8783c71b0e",
    title: "Control Inalámbrico DualShock 4 - Midnight Blue - PlayStation 4",
    description: "Mejor precisión de Control: el tacto, la forma, y la sensibilidad de los sticks analógicos del DualShock4 y botones de disparo se han mejorado. El nuevo botón de Compartir (Share) permite ver y compartir videos en tiempo real con un solo clic",
    images: [
        "https://m.media-amazon.com/images/I/51--ljrR+wL._AC_SX679_.jpg",
        "https://m.media-amazon.com/images/I/51AOgSqSbOL._AC_SX679_.jpg"
    ],
    inStock: 23,
    price: 160000,
    sizes: [],
    slug: "controles",
    tags: "playstation,mando, gamer",
    caterogiras: [
        "tecnologia"
    ],
    type: "controles",
    gender: "videojuegos",}];
    let products = response.filter((i:any)=>{
        let tag = Array.isArray(i.tags)? i.tags[0] : i.tags
        if(i.title.toLowerCase().includes(term)) return i;
        else if(i.description.toLowerCase().includes(term)) return i;
        else if(!!i.slug && i.slug.toLowerCase().includes(term)) return i;
        else if(!!i.tags && tag.toLowerCase().includes(term)) return i;
        else if(!!i.gender && i.gender.toLowerCase().includes(term)) return i;
        else if(!!i.types && i.types.toLowerCase().includes(term))return i;
        else if(!!i.caterogiras && i.caterogiras.length > 0 && i.caterogiras[0].toLowerCase().includes(term)) return i
    })


    
    return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect();
  const products = await models.Product.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(products));
};
