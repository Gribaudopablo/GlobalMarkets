import { Typography,Button,FormControl,Stack,Pagination,InputLabel,Select,MenuItem,Accordion,AccordionSummary,AccordionDetails } from "@mui/material";
import { useEffect,useState,FC} from 'react'
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { ExpandMoreRounded } from "@mui/icons-material";


interface Props {
    filtro:string,
    category: string,
    productos: any[]
}
const Deporte:FC<Props> = ({filtro,category,productos})=>{
    const [product1, setProduct1] = useState(productos);
    const [respaldo,setRespaldo] = useState(productos);
    const [page,setPage] = useState(0);
    const [name,setName] = useState('');
    const [name1,setName1] = useState('');
    const [page1,setPage1] = useState(1);
    const [contador, setContador] = useState(1);
    const [filtros,setFiltros] = useState({min:false,max:false,A_Z:false,Z_A:false,restablecer:false,resTallas:false,balon:false,guantes:false,espinilleras:false,tableros:false,protecciones:false,bolsa:false,costal:false});
    useEffect(()=>{
            setProduct1([...productos]);
            setRespaldo([...productos])
    },[productos]);
    const next = ()=>{
        if(product1.length > page + 11){
            setPage(prev=>prev+11);
        }
    }
    const prev = ()=>{
        if(0 < page){
            setPage(pre=>pre-11);
        }
    }
    const respuesta = ():any[]=>{
        if(filtros.restablecer){
            //setProduct1(products.filter(i=>i.gender === filtro));
            //setRespaldo(products.filter(i=>i.gender === filtro));
            setProduct1([...productos]);
            setRespaldo([...productos]);
            setFiltros(prev=>{
                return {
                    ...prev,
                    restablecer:false
                }
            });
            setPage(prev=>prev-prev);
        } else if(filtros.max){
            setFiltros(prev=>{
                return {
                    ...prev,
                    max: false
                }
            })
            setPage(prev => prev-prev)
            setProduct1(prev => prev.sort((a,b):any=>{
                if(a.price > b.price) return -1
            }))
            setRespaldo(prev => prev.sort((a,b):any=>{
                if(a.price > b.price) return -1
            }))
        } else if (filtros.min){
            setFiltros(prev=>{
                return {
                    ...prev,
                    min: false
                }
            })
            setPage(prev => prev-prev)
            setProduct1(prev => prev.sort((a,b):any=>{
                if(a.price < b.price) return -1
            }))
            setRespaldo(prev => prev.sort((a,b):any=>{
                if(a.price < b.price) return -1
            }))
        } else if (filtros.A_Z){
            setFiltros(prev=>{
                return {
                    ...prev,
                    A_Z: false
                }
            })
            setPage(prev => prev-prev)
            setProduct1(prev => prev.sort((a,b):any=>{
                if(a.title < b.title) return -1
            }));
            setRespaldo(prev => prev.sort((a,b):any=>{
                if(a.title < b.title) return -1
            }))
        } else if (filtros.Z_A){
            setFiltros(prev=>{
                return {
                    ...prev,
                    Z_A: false
                }
            })
            setPage(prev => prev-prev)
            setProduct1(prev => prev.sort((a,b):any=>{
                if(a.title > b.title) return -1
            }));
            setRespaldo(prev => prev.sort((a,b):any=>{
                if(a.title > b.title) return -1
            }))
        }
        if(filtros.resTallas){
            setFiltros(prev=>{
                return{
                    ...prev,
                    resTallas:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(respaldo)
        }
        if(filtros.balon){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    balon:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'balon'))
        } else if (filtros.guantes){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    guantes:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'guantes'));
        } else if (filtros.espinilleras){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    espinilleras:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'espinilleras'));
        } else if (filtros.tableros){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    tableros:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'tablero'));
        } else if (filtros.bolsa){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    bolsa:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'bolsas'));
        } else if (filtros.costal){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    costal:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'costal'));
        } else if (filtros.protecciones){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    protecciones:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'proteccion'));
        }
        if(product1.length === 0) return [{title: "No hay resultados",description: 'null',gender:'unisex',inStock:0,price:0,images:[],type:"pants",sizes:[],slug:'null',tags:[]}];

        return product1.slice(page, page+11);
    }
    const prueba = (e:any)=>{ 
        console.log("esto es product",product1);
        setFiltros(prev=>{
            return {
            ...prev,
            [e.target.value]:true
        }
    })
    handleChange(e,1)
}
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {        
        setPage1(value);
        if(contador < value) {
            let count = value - contador
            while(count > 0){
                next()
                count--
            }
        }
        else if (contador > value){
            let count = contador - value
            while(count > 0){
                prev()
                count--
            }
        }
        setContador(value);
    };  
    const description = filtro === 'men'? 'ellos' : filtro ==='women'? "ellas" : "los niños";
    const genre = filtro === 'men'? 'Hombres' : filtro ==='women'? "Mujeres" : "Niños";
    const selectTallas = (e:any)=>{
        setName(e.target.value)
    };
    const restablecer = (e?:any)=>{
        setName("")
        setName1("")
    handleChange(e,1)
    }
    const selectOrdenar = (e:any)=>{
        setName1(e.target.value)
    }
    return <ShopLayout title={`Global-Market- ${filtro}`}
    pageDescription={`Encuentra los mejores productos para hacer deporte`}>
                <Typography variant="h1" component="h1">
            Deportes-{category}
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
            deporte
        </Typography>
        <Accordion sx={{boxShadow:2,borderRadius:5, maxWidth:380,textAlign:'center', alignSelf:'center',backgroundColor:'ButtonFace'}}>
        <AccordionSummary
        expandIcon={<ExpandMoreRounded/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{textAlign:'end', alignSelf:'center',paddingLeft:17,paddingRight:20}}
        >
        <Typography variant="h6" component="h6">Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Button sx={{paddingLeft:0, backgroundColor:'ButtonFace'}}>
            <Typography variant="h6" component='h6' >Ordenar Por:</Typography>
            <FormControl sx={{ m: 0, minWidth: 133 }} size="small">
                <InputLabel id="ordenar" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Seleccionar</InputLabel>
                <Select
                    color="secondary"
                    sx={{borderRadius:10}}
                    labelId="ordenar"
                    id="ordenar"
                    autoWidth
                    value={name1}
                    onChange={e=>{
                        prueba(e)
                        selectOrdenar(e)
                    }}
                    label="Ordenar Por:">
                    <MenuItem value="">
                        <em>Ninguno</em>
                    </MenuItem>
                    <MenuItem value={'max'} >Mayor Precio</MenuItem>
                    <MenuItem value={'min'} >Menor Precio</MenuItem>
                    <MenuItem value={'A_Z'} >Orden Alfabetico(A-Z)</MenuItem>
                    <MenuItem value={'Z_A'} >Orden Alfabetico(Z-A)</MenuItem>
                </Select>
            </FormControl>
        </Button>
        {filtro === 'futbol'? <Button sx={{paddingLeft:0, backgroundColor:'ButtonFace'}}>
            <Typography variant="h6" component='h6' >Filtrar Por:</Typography>
            <FormControl sx={{ m: 0, minWidth: 133 }} size="small">
                <InputLabel id="futbol" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Seleccionar</InputLabel>
                <Select
                    color="secondary"
                    sx={{borderRadius:10}}
                    labelId="futbol"
                    id="futbol"
                    autoWidth
                    value={name}
                    onChange={e=>{
                        prueba(e)
                        selectTallas(e)
                    }}
                    label="Ordenar Por:">
                    <MenuItem value="">
                        <em>Ninguno</em>
                    </MenuItem>
                    <MenuItem value={'resTallas'} >Todos</MenuItem>
                    <MenuItem value={'balon'} >Balon/Pelota</MenuItem>
                    <MenuItem value={'guantes'} >Guantes</MenuItem>
                    <MenuItem value={'espinilleras'} >Espinilleras</MenuItem>
                </Select>
            </FormControl>
        </Button>: filtro === 'box'? <Button sx={{paddingLeft:0, backgroundColor:'ButtonFace'}}>
            <Typography variant="h6" component='h6' >Filtrar Por:</Typography>
            <FormControl sx={{ m: 0, minWidth: 133 }} size="small">
                <InputLabel id="box" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Seleccionar</InputLabel>
                <Select
                    color="secondary"
                    sx={{borderRadius:10}}
                    labelId="box"
                    id="box"
                    autoWidth
                    value={name}
                    onChange={e=>{
                        prueba(e)
                        selectTallas(e)
                    }}
                    label="Ordenar Por:">
                    <MenuItem value="">
                        <em>Ninguno</em>
                    </MenuItem>
                    <MenuItem value={'resTallas'} >Todos</MenuItem>
                    <MenuItem value={'guantes'} >Guantes</MenuItem>
                    <MenuItem value={'costal'} >Costal</MenuItem>
                    <MenuItem value={'protecciones'} >Protecciones </MenuItem>
                </Select>
            </FormControl>
        </Button>: <Button sx={{paddingLeft:0, backgroundColor:'ButtonFace'}}>
            <Typography variant="h6" component='h6' >Filtrar Por:</Typography>
            <FormControl sx={{ m: 0, minWidth: 133 }} size="small">
                <InputLabel id="basquetbol" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Seleccionar</InputLabel>
                <Select
                    color="secondary"
                    sx={{borderRadius:10}}
                    labelId="basquetbol"
                    id="basquetbol"
                    autoWidth
                    value={name}
                    onChange={e=>{
                        prueba(e)
                        selectTallas(e)
                    }}
                    label="Ordenar Por:">
                    <MenuItem value="">
                        <em>Ninguno</em>
                    </MenuItem>
                    <MenuItem value={'resTallas'} >Todos</MenuItem>
                    <MenuItem value={'balon'} >Balon/Pelota</MenuItem>
                    <MenuItem value={'tableros'} >Tableros</MenuItem>
                    <MenuItem value={'bolsa'} >Bolsas/Mochilas</MenuItem>
                </Select>
            </FormControl>
        </Button>}
        <Button value="restablecer" variant="outlined" sx={{backgroundColor:'Background'}} onClick={(e)=>{
            prueba(e)
            restablecer()
        }} color='secondary' >Restablecer Filtros</Button>
        </AccordionDetails>
    </Accordion>
        <br/>
        <ProductList products={respuesta() as any}/>
        <Stack sx={{textAlign:'center'}} spacing={2}>
            <Pagination sx={{alignSelf:"center"}} variant="outlined" size="large" color="secondary" count={Math.ceil(product1.length / 11)}  page={page1} onChange={handleChange}/>
            <Typography>Pagina: {page1} de {Math.ceil(product1.length / 11)}</Typography>
        </Stack>
    </ShopLayout>
}

export default Deporte;


