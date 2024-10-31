import { useContext, useState } from "react"
import { AuthContext } from "../../autenticacao/AuthProvider"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { api } from "../../services/apiClient"



export const Revista = () => {
    const { isAuthenticated, user} = useContext(AuthContext)

    const [revista,setRevista] = useState('');

    const navigate = useNavigate();

    

    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }


       const id_classe = user.id_classe

       async function handleRevista(e){
        e.preventDefault();

        let nr_revista = parseInt(revista)

        let data = {
            nr_revista,
            id_classe
        }

        await api.post('/revista', data)
                        .then((response) => {
                            setRevista('')
                            //console.log('salvo com sucesso!')
                            navigate(-1)
                           //navigate('/presenca')
                        })
                        .catch((error) => {
                            console.log('erro', error)
                        })

       // console.log(data)
 
    }

    return (
        <>
        <div className="flex justify-center gap-7 pt-2">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Revista</h1>
        </div>
        <form className="max-w-sm mx-auto" onSubmit={handleRevista}>
            <div className="mb-5">
            <label htmlFor="oferta" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Quantidade de Revista</label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite número de biblias"
                id="biblia"
                type="number"
                value={revista}
                onChange={(e) => setRevista(e.target.value)}
              />
            </div>
            <button type="submit"
            className="text-white bg-slate-500 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800" 
            >Salvar</button>
        </form>
        </>
    )
}