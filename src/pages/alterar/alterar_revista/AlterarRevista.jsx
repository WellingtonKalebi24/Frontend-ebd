import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../autenticacao/AuthProvider"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { Input } from "../../../components/input"
import { api } from "../../../services/apiClient"
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const AlterarRevista = () => {
    const { isAuthenticated,} = useContext(AuthContext)

    const [revista,setRevista] = useState('');
    const [listrevista, setListRevista] = useState([])
    

    const [idRevista, setIdRevista] = useState('')
    
    const [dataAtual, setDataAtual] = useState('')
    const [NomeBotao, setNomeBotao] = useState('Salvar')

    const navigate = useNavigate();
    const {idescola } = useParams();
    //const id_classe = classe
    

    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }


       

       async function handleRevista(e){
        e.preventDefault();

            setNomeBotao('Alterando...')
            let id = idRevista

            let nr_revista = parseInt(revista)
    
            let id_classe = idescola;
    
    
            let incrementodata = ':05.729Z'
    
            let update_at = dataAtual + incrementodata
    
            let data = {
                id,
                nr_revista,
                id_classe,
                update_at
            }

            //console.log(data)

            await api.put('/revista/send', data)
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

    const getRevista = async () => {



        try {
            

            const revistalist = await api.post('/revista/list', {"id_classe": idescola,});
  
            //console.log(bibliaList.data);
            

            setListRevista(revistalist.data)
            //console.log(idescola)
            //console.log(bibliaList.data[0].id)
            //console.log(idescola)
            setIdRevista(revistalist.data[0].id)
            
        } catch (error) {
            console.log("erro ao funções", error)
        } 
    }


    



    useEffect(() => {
        getRevista()

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
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Revista</h1>
        </div>
        <form className="max-w-sm mx-auto" onSubmit={handleRevista}>
        
        {listrevista.map((listrevista) => { 
                return ( 
                    <div className="mb-5">
                        <p className="pb-8 font-bold ">Feito pela sala: {listrevista.classes}, Valor: {listrevista.nr_revista}</p>
                        <label htmlFor="classe" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Classe</label> 
                    <select value={idRevista} onChange={(e) => setIdRevista(e.target.value)}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     >
                         <option id="classes" value={listrevista.id} key={listrevista.id} >{listrevista.classes}</option>
                    </select> 
                    <label htmlFor="revista" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Alterar Quantidade de Revista</label> 
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Digite número de biblias" 
                        id="revista"
                        type="number"
                        value={revista}
                        onChange={(e) => setRevista(e.target.value)}
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