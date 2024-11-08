import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './erros/AuthTokenError'; 

import { signOut } from '../autenticacao/AuthProvider';

export function setupAPIClient(ctx){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@viteauth.token']}`
        }
    })


    api.interceptors.response.use(response => {
        return response
    }, (error) => {
        if(error.response.status === 401){

            if(typeof window !== undefined){
                // deslogar usuario
                signOut();

            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)

    }) 

    return api
}
