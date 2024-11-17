import { AuthContext } from "../../autenticacao/AuthProvider";
import { useContext } from "react";
import { Navigate, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";

export const PresencaProfClass = () => {
    const { isAuthenticated, user} = useContext(AuthContext)

    const [nomePessoa, setNomespessoa] = useState([])
    const [pessoa, setPessoa] = useState('')
     const navigate = useNavigate();



    const [dataInsert, setDataInsert] = useState('')



    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1; // Os meses começam do 0, então adicione 1
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    //console.log(dataAtual.)
    //console.log(dataInsert);

    
    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }

       //console.log()

    const nmPessoa = async () => {

        const id_classe = user.id_classe

        let data = {
            "id_funcao": "5865f887-914c-47ed-922f-242e308771e6",
        }
        
        try {
            const responseNmpessoa = await api.post('/alunoProfessores/class/secretario', data);

            setNomespessoa(responseNmpessoa.data)
            //console.log(nomePessoa)
  
        } catch (error) {
            console.log("erro ao funções", error)
        }
    }



    const handleNavigate = () => {
        navigate(-1)
    }

    const handlePresente = async  (nm_pessoa,
        presenca,
        id_classe,
        id_funcao,
        id_pessoa) => {
                //console.log(nm_pessoa + presenca + id_classe + id_funcao + id_pessoa)

                let data = {
                    nm_pessoa,
                    presenca,
                    id_classe,
                    id_funcao,
                    id_pessoa
                }

                await api.post('/presenca', data)
                        .then((response) => {

                            //console.log('salvo com sucesso!')

                           // navigate('/presenca')
                        })
                        .catch((error) => {
                            console.log('erro', error)
                        })
                

    }

    const handleFalta = async  (nm_pessoa,
        presenca,
        id_classe,
        id_funcao,
        id_pessoa) => {
                //console.log(nm_pessoa + presenca + id_classe + id_funcao + id_pessoa)

                let data = {
                    nm_pessoa,
                    presenca,
                    id_classe,
                    id_funcao,
                    id_pessoa
                }

                await api.post('/presenca', data)
                        .then((response) => {

                            //console.log('salvo com sucesso!')

                           // navigate('/presenca')
                        })
                        .catch((error) => {
                            console.log('erro', error)
                        })
                

    }



   
       useEffect(() => {
        nmPessoa()
        //setDataInsert(`${ano}-${mes}-${dia}-T14:25:05.729Z`)   
       })


    return (
        
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="flex justify-center gap-7 pt-2">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Presença</h1>
        </div>
<div >
    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    onClick={handleNavigate}>Voltar</button>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {/* <th scope="col" className="px-6 py-3">
                    Data
                </th> */}
                <th scope="col" className="px-6 py-3">
                    Nome
                </th>
                <th scope="col" className="px-6 py-3">
                    
                </th>
                <th scope="col" className="px-6 py-3">
                    
                </th>

            </tr>
        </thead>
        <tbody>
        {nomePessoa.map((nomes) => 
        {return <>
                <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={nomes.id}>
                        {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" 
                    value={dataInsert} >
                    {dataFormatada}
                        </th> */}
                        <td value={pessoa} onChange={(e) => setPessoa(e.target.value)}  className="px-6 py-4"> 
                        {nomes.nm_pessoa}
                        </td> 
                    <td className="px-6 py-4"  >
                    <div >
                    <button class="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900"
                    onClick={() => handlePresente(nomes.nm_pessoa, true, nomes.id_classe, nomes.id_funcao, nomes.id)} 
                    >Presente</button>
                    </div>
                    </td>
                    <td className="px-6 py-4"  >  
                    <div>
                    <button class="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900"
                    onClick={() => handleFalta(nomes.nm_pessoa, false, nomes.id_classe, nomes.id_funcao, nomes.id)}
                    >Falta</button>
                    </div>
                    </td>
                   
                        
                </tr>
                </>     
                })}           
        </tbody>
    </table>
    {/* <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
                <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
            </li>
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
            </li>
            <li>
        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav> */}
 
</div>
    )
}