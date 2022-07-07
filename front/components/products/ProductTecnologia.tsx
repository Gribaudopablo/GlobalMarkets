import { Typography,Button,FormControl,Stack,Pagination,InputLabel,Select,MenuItem,Accordion,AccordionSummary,AccordionDetails } from "@mui/material";
import { useEffect,useState,FC} from 'react'
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { ExpandMoreRounded, ExpandMoreTwoTone } from "@mui/icons-material";



interface Props {
    filtro:string,
    category: string,
    productos: any[];
}
const Tecnologia:FC<Props> = ({filtro,category,productos})=>{
    const [product1, setProduct1] = useState([...productos]);
    const [respaldo,setRespaldo] = useState([...productos]);
    const [page,setPage] = useState(0);
    const [name,setName] = useState('');
    const [name1,setName1] = useState('');
    const [page1,setPage1] = useState(1);
    const [contador, setContador] = useState(1);
    const [filtros,setFiltros] = useState({min:false,max:false,A_Z:false,Z_A:false,restablecer:false,resTallas:false,accesorios:false,computadoras:false,monitores:false,consolas:false,juegos:false,controles:false,celulares:false,tablet:false,tv:false});
    useEffect(()=>{
            setProduct1([...productos]);
            setRespaldo([...productos]);
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
        if(filtros.accesorios){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    accesorios:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'accesorios'))
        } else if (filtros.computadoras){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    computadoras:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'computadora'));
        } else if (filtros.monitores){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    monitores:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'monitores'));
        } else if (filtros.consolas){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    consolas:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'consolas'));
        } else if (filtros.controles){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    controles:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'controles'));
        } else if (filtros.juegos){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    juegos:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'juegos'));
        } else if (filtros.celulares){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    celulares:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'celulares'));
        } else if (filtros.tablet){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    tablet:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'tabletas'));
        } else if (filtros.tv){
            if(!!respaldo && product1.length < respaldo.length) setProduct1(respaldo);
            setFiltros(prev=>{
                return {
                    ...prev,
                    tv:false
                }
            });
            setPage(prev=>prev-prev);
            setProduct1(prev=>prev.filter(i=>i.type === 'tv'));
        }
        if(product1.length === 0) return [{title: "No hay resultados",description: 'null',gender:'unisex',inStock:0,price:0,images:[],type:"pants",sizes:[],slug:'null',tags:[]}];

        return product1.slice(page, page+11);
    }
    const prueba = (e:any)=>{ 
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
            Tecnologia-{category}
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
            {category}
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
        {filtro === 'computacion'? <Button sx={{paddingLeft:0, backgroundColor:'ButtonFace'}}>
            <Typography variant="h6" component='h6' >Filtrar Por:</Typography>
            <FormControl sx={{ m: 0, minWidth: 133 }} size="small">
                <InputLabel id="futbol" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Seleccionar</InputLabel>
                <Select
                    color="secondary"
                    sx={{borderRadius:10}}
                    labelId="computacion"
                    id="computacion"
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
                    <MenuItem value={'computadoras'} >Computadoras</MenuItem>
                    <MenuItem value={'monitores'} >Monitores</MenuItem>
                    <MenuItem value={'accesorios'} >Accesorios</MenuItem>
                </Select>
            </FormControl>
        </Button>: filtro === 'videojuegos'? <Button sx={{paddingLeft:0, backgroundColor:'ButtonFace'}}>
            <Typography variant="h6" component='h6' >Filtrar Por:</Typography>
            <FormControl sx={{ m: 0, minWidth: 133 }} size="small">
                <InputLabel id="box" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Seleccionar</InputLabel>
                <Select
                    color="secondary"
                    sx={{borderRadius:10}}
                    labelId="videojuegos"
                    id="videojuegos"
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
                    <MenuItem value={'consolas'} >Consolas</MenuItem>
                    <MenuItem value={'controles'} >Controles</MenuItem>
                    <MenuItem value={'juegos'} >Juegos</MenuItem>
                </Select>
            </FormControl>
        </Button>: <Button sx={{paddingLeft:0, backgroundColor:'ButtonFace'}}>
            <Typography variant="h6" component='h6' >Filtrar Por:</Typography>
            <FormControl sx={{ m: 0, minWidth: 133 }} size="small">
                <InputLabel id="diario" sx={{fontFamily:'sans-serif',fontWeight:'Bold',color:'GrayText'}}>Seleccionar</InputLabel>
                <Select
                    color="secondary"
                    sx={{borderRadius:10}}
                    labelId="diario"
                    id="diario"
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
                    <MenuItem value={'celulares'} >Celulares</MenuItem>
                    <MenuItem value={'tablet'} >Tabletas</MenuItem>
                    <MenuItem value={'tv'} >Smart TV</MenuItem>
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

export default Tecnologia;


