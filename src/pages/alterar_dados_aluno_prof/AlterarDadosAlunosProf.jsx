import { useContext, useState } from "react"
import { AuthContext } from "../../autenticacao/AuthProvider"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { api } from "../../services/apiClient"
import { useEffect } from "react"

export const AlterarDadosAlunosProf = () => {
    const { isAuthenticated, user} = useContext(AuthContext)

    const [nm_pessoa, setNmpessoa] = useState('');

    const [dt_nasciment, setDataNascimento] = useState('')

    const [classes, setClasse] = useState([])
    const [id_classe, setIdClasse] = useState('');

    const [funcoes, setFuncoes] = useState([]);
    const [id_funcao, setIdfuncao] = useState('');
    const [listAlunoProf, setListAlunoProf] = useState([])
    const navigate = useNavigate();

    

    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }


       const funcao = async () => {
        try {
            const responseFunc = await api.get('/funcao');
  
            //console.log(responseFunc.data);
  
            //const { id , funcoes } = responseFunc.data;
            setFuncoes(responseFunc.data)
  
  
        } catch (error) {
            console.log("erro ao funções", error)
        }
    }

    const classe = async () => {
        try {
            const responseClasse = await api.get('/classe');
  
            //console.log(responseFunc.data);
  
            //const { id , funcoes } = responseFunc.data;
            setClasse(responseClasse.data)
  
  
        } catch (error) {
            console.log("erro ao funções", error)
        }
    }

    
   async function listagemAlunosProf(e) {

        e.preventDefault();


        let data = {
            id_classe
        }


        try {
            const responseAlunoProf = await api.post('/alunoProfessores/class', data );
  
            //console.log(responseFunc.data);
  
            //const { id , funcoes } = responseFunc.data;1
            //setClasse(responseClasse.data)
            setListAlunoProf(responseAlunoProf.data)
            console.log(responseAlunoProf.data)
  
  
        } catch (error) {
            console.log("erro ao funções", error)
        }
    }
    



    const handleNavigate = () => {
      navigate(-1)
  }

    useEffect(() => {
        funcao()
        classe()
        //listagemAlunosProf()
      },[])

    return (
        <>
        <div className="flex justify-center gap-7 pt-2">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Alterar - Aluno/Professor</h1>
        </div>

        <div >
    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    onClick={handleNavigate}>Voltar</button>
    </div>

            <div className="mb-5">
            <div class="h-56 grid grid-cols-5 gap-4 content-center">
              <select value={id_classe} onChange={(e) => setIdClasse(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled selected> Selecione Uma opção</option>
              {classes.map((classes) => {
                return (
                  <option id="classes" value={classes.id} key={classes.id} >{classes.classes}</option>
                )
            })}
             
              </select>
               <button onClick={listagemAlunosProf}
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><h5>Pesquisar</h5></button> 
               </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Nome
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Data
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Classe
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Função
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Alterar
                </th>   
            </tr>
        </thead>
        <tbody>
            {listAlunoProf.map((listAlunoProf) => {
                return ( 
                    <>
            <tr className="border-b border-gray-200 dark:border-gray-700">
                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                 {listAlunoProf.nm_pessoa}
                 </th>
                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {listAlunoProf.dt_nascimento}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {listAlunoProf.id_classe}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {listAlunoProf.id_funcao}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                Alterar
                </th>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
                
            </tr>
           
            </>
            )
            })}
        </tbody>
    </table>
</div>
        </>
    )
}