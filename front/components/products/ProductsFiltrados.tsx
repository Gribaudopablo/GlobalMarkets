import {
  Typography,
  Button,
  FormControl,
  Stack,
  Pagination,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useEffect, useState, FC } from "react";
import { SeedProduct } from "../../database/products";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";

import { ExpandMoreTwoTone } from "@mui/icons-material";

var inicio: any[] = [];

interface Props {

  filtro: string;
  category: string;
}

const ProductFilter: FC<Props> = ({ filtro, category }) => {
  const { products } = useProducts("/products");
  const [product, setProduct] = useState(inicio);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [page1, setPage1] = useState(1);
  const [contador, setContador] = useState(1);
  const [respaldo, setRespaldo] = useState(inicio);
  const [filtros, setFiltros] = useState({
    min: false,
    max: false,
    A_Z: false,
    Z_A: false,
    XS: false,
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,
    XXXL: false,
    restablecer: false,
    resTallas: false,
  });
  useEffect(() => {
    setProduct(products.filter((i) => i.gender === filtro));
    setRespaldo(products.filter((i) => i.gender === filtro));
  }, [filtro, products]);
  const next = () => {
    if (product.length > page + 9) {
      setPage((prev) => prev + 9);
    }
  };
  const prev = () => {
    if (0 < page) {
      setPage((pre) => pre - 9);
    }
  };
  const respuesta = (): SeedProduct[] => {
    if (filtros.restablecer) {
      setProduct(products.filter((i) => i.gender === filtro));
      setRespaldo(products.filter((i) => i.gender === filtro));
      setFiltros((prev) => {
        return { ...prev, restablecer: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.XS) {
      if (!!respaldo && product.length < respaldo.length) setProduct(respaldo);
      setProduct((prev: any) =>
        prev.filter((i: SeedProduct) => i.sizes.includes("XS"))
      );
      setFiltros((prev) => {
        return { ...prev, XS: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.S) {
      if (!!respaldo && product.length < respaldo.length) setProduct(respaldo);
      setProduct((prev: any) =>
        prev.filter((i: SeedProduct) => i.sizes.includes("S"))
      );
      setFiltros((prev) => {
        return { ...prev, S: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.M) {
      if (!!respaldo && product.length < respaldo.length) setProduct(respaldo);
      setProduct((prev: any) =>
        prev.filter((i: SeedProduct) => i.sizes.includes("M"))
      );
      setFiltros((prev) => {
        return { ...prev, M: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.L) {
      if (!!respaldo && product.length < respaldo.length) setProduct(respaldo);
      setProduct((prev: any) =>
        prev.filter((i: SeedProduct) => i.sizes.includes("L"))
      );
      setFiltros((prev) => {
        return { ...prev, L: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.XL) {
      if (!!respaldo && product.length < respaldo.length) setProduct(respaldo);
      setProduct((prev: any) =>
        prev.filter((i: SeedProduct) => i.sizes.includes("XL"))
      );
      setFiltros((prev) => {
        return { ...prev, XL: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.XXL) {
      if (!!respaldo && product.length < respaldo.length) setProduct(respaldo);
      setProduct((prev: any) =>
        prev.filter((i: SeedProduct) => i.sizes.includes("XXL"))
      );
      setFiltros((prev) => {
        return { ...prev, XXL: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.XXXL) {
      if (!!respaldo && product.length < respaldo.length) setProduct(respaldo);
      setProduct((prev: any) =>
        prev.filter((i: SeedProduct) => i.sizes.includes("XXXL"))
      );
      setFiltros((prev) => {
        return { ...prev, XXXL: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.resTallas) {
      setProduct(respaldo);
      setFiltros((prev) => {
        return { ...prev, resTallas: false };
      });
      setPage((prev) => prev - prev);
    }
    if (filtros.min) {
      setRespaldo((prev: any) =>
        prev.sort((a: SeedProduct, b: SeedProduct) => {
          if (a.price < b.price) return -1;
        })
      );
      setProduct((prev: any) =>
        prev.sort((a: SeedProduct, b: SeedProduct) => {
          if (a.price < b.price) return -1;
        })
      );
      setFiltros((prev) => {
        return { ...prev, min: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.max) {
      setRespaldo((prev: any) =>
        prev.sort((a: SeedProduct, b: SeedProduct) => {
          if (a.price > b.price) return -1;
        })
      );
      setProduct((prev: any) =>
        prev.sort((a: SeedProduct, b: SeedProduct) => {
          if (a.price > b.price) return -1;
        })
      );
      setFiltros((prev) => {
        return { ...prev, max: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.A_Z) {
      setRespaldo((prev: any) =>
        prev.sort((a: SeedProduct, b: SeedProduct) => {
          if (a.title < b.title) return -1;
        })
      );
      setProduct((prev: any) =>
        prev.sort((a: SeedProduct, b: SeedProduct) => {
          if (a.title < b.title) return -1;
        })
      );
      setFiltros((prev) => {
        return { ...prev, A_Z: false };
      });
      setPage((prev) => prev - prev);
    } else if (filtros.Z_A) {
      setRespaldo((prev: any) =>
        prev.sort((a: SeedProduct, b: SeedProduct) => {
          if (a.title > b.title) return -1;
        })
      );
      setProduct((prev: any) =>
        prev.sort((a: SeedProduct, b: SeedProduct) => {
          if (a.title > b.title) return -1;
        })
      );
      setFiltros((prev) => {
        return { ...prev, Z_A: false };
      });
      setPage((prev) => prev - prev);
    }
    if (product.length === 0)
      return [
        {
          title: "No hay resultados",
          description: "null",
          gender: "unisex",
          inStock: 0,
          price: 0,
          images: [],
          type: "pants",
          sizes: [],
          slug: "null",
          tags: [],
        },
      ];

    return product.slice(page, page + 9);
  };
  const prueba = (e: any) => {
    setFiltros((prev) => {
      return {
        ...prev,
        [e.target.value]: true,
      };
    });
    handleChange(e, 1);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage1(value);
    if (contador < value) {
      let count = value - contador;
      while (count > 0) {
        next();
        count--;
      }
    } else if (contador > value) {
      let count = contador - value;
      while (count > 0) {
        prev();
        count--;
      }
    }
    setContador(value);
  };
  const description =
    filtro === "men" ? "ellos" : filtro === "women" ? "ellas" : "los niños";
  const genre =
    filtro === "men" ? "Hombres" : filtro === "women" ? "Mujeres" : "Niños";
  const selectTallas = (e: any) => {
    setName(e.target.value);
  };
  const restablecer = (e: any) => {
    setName("");
    setName1("");
    handleChange(e, 1);
  };
  const selectOrdenar = (e: any) => {
    setName1(e.target.value);
  };
  return (
    <ShopLayout
      title={`Global-Market- ${filtro}`}
      pageDescription={`Encuentra los mejores productos para ${description}`}>
      <Typography variant="h1" component="h1">
        {category}
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        La mejor ropa para {genre}
      </Typography>
      <br />
      <Accordion sx={{ boxShadow: 5, borderRadius: 5 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreTwoTone />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography variant="h6" component="h6">
            Filtros
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button sx={{ paddingLeft: 0 }}>
            <Typography variant="h6" component="h6">
              Ordenar Por:
            </Typography>
            <FormControl sx={{ m: 0, minWidth: 133 }} size="small">
              <InputLabel
                id="demo-select-small"
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: "Bold",
                  color: "GrayText",
                }}>
                Seleccionar
              </InputLabel>
              <Select
                color="secondary"
                sx={{ borderRadius: 10 }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={name1}
                onChange={(e) => {
                  prueba(e);
                  selectOrdenar(e);
                }}
                autoWidth
                label="Ordenar Por:">
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value={"max"}>Mayor Precio</MenuItem>
                <MenuItem value={"min"}>Menor Precio</MenuItem>
                <MenuItem value={"A_Z"}>Orden Alfabetico(A-Z)</MenuItem>
                <MenuItem value={"Z_A"}>Orden Alfabetico(Z-A)</MenuItem>
              </Select>
            </FormControl>
          </Button>
          <Button sx={{ paddingLeft: 0 }}>
            <Typography variant="h6" component="h6">
              Filtrar Por Tallas:
            </Typography>
            <FormControl sx={{ m: 0, minWidth: 133 }} size="small">
              <InputLabel
                id="tallas"
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: "Bold",
                  color: "GrayText",
                }}>
                Seleccionar
              </InputLabel>
              <Select
                color="secondary"
                sx={{ borderRadius: 10 }}
                labelId="tallas"
                id="tallas"
                value={name}
                onChange={(e) => {
                  prueba(e);
                  selectTallas(e);
                }}
                autoWidth
                label="Filtrar Por Tallas:">
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value={"resTallas"}>Todas</MenuItem>
                <MenuItem value={"XS"}>XS</MenuItem>
                <MenuItem value={"S"}>S</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
                <MenuItem value={"XL"}>XL</MenuItem>
                <MenuItem value={"XXL"}>XXL</MenuItem>
                <MenuItem value={"XXXL"}>XXXL</MenuItem>
              </Select>
            </FormControl>
          </Button>
          <Button
            value="restablecer"
            variant="outlined"
            onClick={(e) => {
              prueba(e);
            }}
            color="secondary">
            Restablecer Filtros
          </Button>
        </AccordionDetails>
      </Accordion>
      <br />
      <ProductList products={respuesta() as any} />
      <Stack sx={{ textAlign: "center" }} spacing={2}>
        <Pagination
          sx={{ alignSelf: "center" }}
          variant="outlined"
          size="large"
          color="secondary"
          count={Math.ceil(product.length / 9)}
          page={page1}
          onChange={handleChange}
        />
        <Typography>
          Pagina: {page1} de {Math.ceil(product.length / 9)}
        </Typography>
      </Stack>
    </ShopLayout>
  );
};

export default ProductFilter;
