import { createContext, ReactNode, useState, useEffect } from "react"

import { destroyCookie, setCookie, parseCookies } from "nookies";

import { api } from "../services/apiClient";


export const AuthContext = createContext({})

export function signOut(){
    
    try{
        destroyCookie(undefined, '@viteauth.token');
        setUser('')
        
    }catch{
        console.log('erro ao deslogar')
    }
}


export function AuthProvider({children}){


    const [user, setUser] = useState()
    const [classes, setClasses] = useState('')
    const isAuthenticated =  !!user;

    //const [loading, setLoading] = useState(false)
    function guardarClasse(id_classe){


        setClasses(id_classe)
    }



    async function signIn({id_funcao, nm_pessoa, senha}){
        // console.log("Dados para logar id_funcao:", id_funcao)
        // console.log("Dados para logar nm_pessoa:", nm_pessoa)
        // console.log("Dados para logar senha:", senha)

        try {
            const response = await api.post('/sessao', { id_funcao, nm_pessoa, senha})
            
            //console.log(response.data)

            const { id, id_classe , token } = response.data;

            setUser({
                id, id_classe 
              }) 


            setCookie(undefined, '@viteauth.token', token, {
                maxAge: 60 * 60 *24 * 30 * 1000,
                path: "/" // quais caminhos terao acesso ao cookie
            })

             
            //Passar para proximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
              

        } catch (error) {
            console.log("erro ao acessar", error)
            destroyCookie(undefined, '@viteauth.token')
        }

    }



    return(
        <AuthContext.Provider value={{user , isAuthenticated, signIn, signOut, classes, guardarClasse}}>
            {children}
        </AuthContext.Provider>
    )
}