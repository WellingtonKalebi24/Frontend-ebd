import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../autenticacao/AuthProvider"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { Input } from "../../../components/input"
import { api } from "../../../services/apiClient"
import { useParams } from "react-router-dom"

export const AlterarBiblia = () => {
    const { isAuthenticated, classe} = useContext(AuthContext)

    const [biblia,setBiblia] = useState('');
    const [listbiblia, setListBiblia] = useState([])
    

    const [idBiblia, setIdBiblia] = useState('')
    
    const [dataAtual, setDataAtual] = useState('')

    const navigate = useNavigate();
    const id_classe = classe
    

    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }


       

       async function handleBiblia(e){
        e.preventDefault();

        let id = idBiblia

        let nr_biblia = parseInt(biblia)


        let incrementodata = ':05.729Z'

        let update_at = dataAtual + incrementodata

        let data = {
            id,
            nr_biblia,
            id_classe,
            update_at
        }

        // await api.post('/biblia/send', data)
        //                 .then((response) => {
        //                     setBiblia('')
        //                     //console.log('salvo com sucesso!')
        //                     navigate(-1)
        //                    //navigate('/presenca')
        //                 })
        //                 .catch((error) => {
        //                     console.log('erro', error)
        //                 })

        console.log(data)
 
    }

    const getBiblia = async () => {
        try {
            
            const bibliaList = await api.get('/biblia/list', id_classe);
  
            //console.log(bibliaList.data);
            

            setListBiblia(bibliaList.data)
            console.log(listbiblia)

            
        } catch (error) {
            console.log("erro ao funções", error)
        }
    }



    useEffect(() => {
        getBiblia()

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        setDataAtual(formattedDateTime);
    },[])

    return (
        <>
        <div className="flex justify-center gap-7 pt-2">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Bíblia</h1>
        </div>
        <form className="max-w-sm mx-auto" onSubmit={handleBiblia}>
        
        {listbiblia.map((listbiblia) => { 
                return ( 
                    <div className="mb-5">
                        <p className="pb-8 font-bold ">Feito pela sala: {listbiblia.classes}, Valor: {listbiblia.nr_biblia}</p>
                        <label htmlFor="classe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Classe</label> 
                    <select value={idBiblia} onChange={(e) => setIdBiblia(e.target.value)}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     >
                         <option id="classes" value={listbiblia.id} key={listbiblia.id} >{listbiblia.classes}</option>
                    </select> 
                    <label htmlFor="biblia" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Alterar Quantidade de Bíblia</label> 
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Digite número de biblias" 
                        id="biblia"
                        type="number"
                        value={biblia}
                        onChange={(e) => setBiblia(e.target.value)}
                      />
                <label htmlFor="dataatual" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Data Atual</label> 
               <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite a data"
                id="data"
                type="datetime-local"
                value={dataAtual}
                onChange={(e) => setDataAtual(e.target.value)}  readOnly
              />
                  </div>
                   )
                })}
                  
                          {/* <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite número de biblias"
                id="biblia"
                type="number"
                value={biblia}
                onChange={(e) => setBiblia(e.target.value)}
              ></input> */}
            <button type="submit"
            className="text-white bg-slate-500 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800" 
            >Salvar</button>
        </form>
        </>
    )
}