import { createContext } from 'react';
import { IUser } from '../../interfaces';


interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;


    loginUser: (Username:string, email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, surname:string, Username:string,  password: string, email: string, dni:number, age:number, address:string, phoneNumber:number) => Promise<{ hasError: boolean; message?: string; }>;
    logout: () => void;
}


export const AuthContext = createContext({} as ContextProps );

