

import { FC, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';
import axios from 'axios';

import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';

import { useRouter } from 'next/router'; 
export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider:FC<any> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

    const router = useRouter();


    useEffect(() => {
         checkToken();
    }, [])





    const checkToken = async() => {
        if (!Cookies.get('token')) { 
            return ;
        }
        const tokenn = Cookies.get('token');
        console.log(tokenn)
        try {
            const { data } = await tesloApi.post('/users/users/secure',{token:tokenn});
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            // console.log('estro por aqui')
            Cookies.remove('token');
            console.log(error)
        }
    } 



    const loginUser = async(Username:string, email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await tesloApi.post('/users/users/login', {Username, email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });

            return true;
        } catch (error) {
            return false;
        }

    }



    const registerUser = async( name: string, surname:string, Username:string, password: string, email: string, dni:number, age:number, address:string, phoneNumber:number): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await tesloApi.post('/users', { name, surname, Username, password, email, dni, age, address, phoneNumber});

            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: "error de axios"
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }


    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('cart');
        router.reload()
    }



    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,

            logout


        }}>
            { children }
        </AuthContext.Provider>
    )
}; 