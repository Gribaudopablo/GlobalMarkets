import useSWR, { SWRConfiguration } from 'swr';
import { initialData } from '../database/products';
import { IProduct } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<IProduct[]>(`https://globalmarkets13.herokuapp.com${ url }`, config );

    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }

}