import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../autenticacao/AuthProvider"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { Input } from "../../../components/input"
import { api } from "../../../services/apiClient"
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const AlterarVisita = () => {
    const { isAuthenticated,} = useContext(AuthContext)

    const [visita,setVisita] = useState('');
    const [listvisita, setListVisita] = useState([])
    

    const [idVisita, setIdVisita] = useState('')
    
    const [dataAtual, setDataAtual] = useState('')
    const [NomeBotao, setNomeBotao] = useState('Salvar')

    const navigate = useNavigate();
    const {idescola } = useParams();
    //const id_classe = classe
    

    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }


       

       async function handleVisita(e){
        e.preventDefault();

            setNomeBotao('Alterando...')
            let id = idVisita

            let nr_visitante = parseInt(visita)
    
            let id_classe = idescola;
    
    
            let incrementodata = ':05.729Z'
    
            let update_at = dataAtual + incrementodata
    
            let data = {
                id,
                nr_visitante,
                id_classe,
                update_at
            }

            //console.log(data)

            await api.put('/visita/send', data)
            .then((response) => {
                toast.success("Alterado com sucesso!")
                //console.log('salvo com sucesso!')
                setNomeBotao('Salvar');
               //navigate('/presenca')
            })
            .catch((error) => {
                toast.error("Erro ao alterar")
                console.log("erro", error)
                setNomeBotao('Salvar');
            })
            navigate(-1)

            
            
        
 
    }

    const getVisita = async () => {



        try {
            

            const visitaList = await api.post('/visita/list', {"id_classe": idescola,});
  
            //console.log(bibliaList.data);
            

            setListVisita(visitaList.data)
            //console.log(idescola)
            //console.log(bibliaList.data[0].id)
            //console.log(idescola)
            setIdVisita(visitaList.data[0].id)
            
        } catch (error) {
            console.log("erro ao funções", error)
        } 
    }


    



    useEffect(() => {
        getVisita()

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
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Visita</h1>
        </div>
        <form className="max-w-sm mx-auto" onSubmit={handleVisita}>
        
        {listvisita.map((listvisita) => { 
                return ( 
                    <div className="mb-5">
                        <p className="pb-8 font-bold ">Feito pela sala: {listvisita.classes}, Valor: {listvisita.nr_visita}</p>
                        <label htmlFor="classe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Classe</label> 
                    <select value={idVisita} onChange={(e) => setIdVisita(e.target.value)}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     >
                         <option id="classes" value={listvisita.id} key={listvisita.id} >{listvisita.classes}</option>
                    </select> 
                    <label htmlFor="visita" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Alterar Quantidade de Visitante</label> 
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Digite número de biblias" 
                        id="visita"
                        type="number"
                        value={visita}
                        onChange={(e) => setVisita(e.target.value)}
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
            >{NomeBotao}</button>
        </form>
        <ToastContainer />
        </>
    )
}