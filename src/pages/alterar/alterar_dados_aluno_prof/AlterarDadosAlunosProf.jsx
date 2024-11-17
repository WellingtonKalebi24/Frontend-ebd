import { useContext, useState } from "react"
import { AuthContext } from "../../../autenticacao/AuthProvider"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { api } from "../../../services/apiClient"
import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"


export const AlterarDadosAlunosProf = () => {
    const { isAuthenticated, user} = useContext(AuthContext)

    const [nm_pessoa, setNmpessoa] = useState('');

    const [dt_nasciment, setDataNascimento] = useState('')

    const [classes, setClasse] = useState([])
    const [id_classe, setIdClasse] = useState('');

    const [funcoes, setFuncoes] = useState([]);
    const [id_funcao, setIdfuncao] = useState('');
    const [listAlunoProf, setListAlunoProf] = useState([])

    const [data, setData] = useState({
        id: '',
        nm_pessoa: '',
        dt_nascimento: '',
        id_funcao: '',
        id_classe: '',  
        updated_at: '',
        ativo: '',
        funcao: '',
    })



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
            const responseAlunoProf = await api.post('/listarAlunosProfessores', data );
  
            //console.log(responseFunc.data);
  
            //const { id , funcoes } = responseFunc.data;1
            //setClasse(responseClasse.data)
            setListAlunoProf(responseAlunoProf.data)
            //setItems(responseAlunoProf.data)
            //console.log(responseAlunoProf.data)
  
  
        } catch (error) {
            console.log("erro ao funções", error)
        }
    }
    



    const handleNavigate = () => {
      navigate(-1)
  }

  const handleAcaoDois =  (id, nome, data_nasceu, funcao_id, classe_id, ativou, funcao) => {
    document.getElementById('my_modal_3').showModal(); 
    //console.log(id + nome + data_nasceu + funcao_id  + classe_id + ativou)

    const formatted = formatDate(data_nasceu);
      
   setData({  id: id,
        nm_pessoa: nome,
        dt_nascimento: formatted,
        id_funcao: funcao_id,
        id_classe: classe_id,  
        updated_at: new Date(),
        ativo: ativou,
        funcao: funcao})
        
        //console.log(data)
  };


  function formatDate(inputDate) {
    // Suponha que `inputDate` seja uma string no formato "dd/mm/yyyy"
    const [day, month, year] = inputDate.split('/');
    
    // Cria uma data no formato yyyy-MM-ddT00:00
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00`;
    
    return formattedDate;
  }


  const formatDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };


    useEffect(() => {
        funcao()
        classe()
        //listagemAlunosProf()
      },[])

      const valueInput = (e) => setData({...data, [e.target.name]: e.target.value})


      const AlterarAlunoProfessor = async() => {

        let ativos

        let dataAtual = formatDateTime()

        let datanascimento = data.dt_nascimento + ":05.729Z"

         

 


        try {
          await api.put('/alunoProfessores/send',
            { "id": data.id, 
              "nm_pessoa": data.nm_pessoa,
               "dt_nascimento": datanascimento, 
               "id_funcao": data.id_funcao,
                "id_classe": data.id_classe,
                "update_at": dataAtual,
                "ativo": data.ativo === "false" ? false : true}
          ).then(() => {
            toast.success('Alterado com sucesso!')
            // console.log( { "id": data.id, 
            //   "nm_pessoa": data.nm_pessoa,
            //    "dt_nascimento": datanascimento, 
            //    "id_funcao": data.id_funcao,
            //     "id_classe": data.id_classe,
            //     "update_at": dataAtual,
            //     "ativo": ativos})
            //setLoading(true)
            
          }).catch(() => {
            toast.error('Erro ao Alterar!')
          }) 

          

      } catch (error) {
        
          console.log("erro ao funções", error)

      }





      }

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
                    Data Nascimento
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Classe
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Função
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Status
                </th>   

                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    
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
                {listAlunoProf.data_nascimento}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {listAlunoProf.classes}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {listAlunoProf.funcoes}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {listAlunoProf.ativo ? 'Ativo' : 'Inativo'}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                <button  onClick={()=> //document.getElementById('my_modal_3').showModal(); 
                    handleAcaoDois(listAlunoProf.id, listAlunoProf.nm_pessoa,  listAlunoProf.data_nascimento, listAlunoProf.id_funcao, 
                        listAlunoProf.id_classe, listAlunoProf.ativo, listAlunoProf.funcoes 
                    )
                } type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Alterar</button>
                </th>
            </tr>
   <dialog id="my_modal_3" className="modal relative p-4 w-full max-w-md max-h-full">
  <div className="relative p-4 w-full max-w-md max-h-full">
    <form method="dialog" onSubmit={AlterarAlunoProfessor} >
    <div className="mb-4">
            <label htmlFor="nm_pessoa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Nome</label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite o nome completo"
                id="nm_pessoa"
                name="nm_pessoa"
                type="text"
                value={data.nm_pessoa}
                onChange={valueInput}
              />
            <label htmlFor="dt_nascimento" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Data de Nascimento</label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite a data"
                id="data"
                type="datetime-local"
                name="dt_nascimento"
                value={data.dt_nascimento}
                //onChange={(e) => setDataNascimento(e.target.value)}
              />
             <div className="mb-5">
              <label htmlFor="funcao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Função:</label>
              <select value={data.id_funcao} //onChange={(e) => setIdfuncao(e.target.value)} 
              name="id_funcao"
              onChange={valueInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected> Selecione Uma opção</option>
              {funcoes.map((funcoes) => {
                return (
                  <option name="id_funcao"
                  onChange={valueInput}
                  id="funcoes" value={funcoes.id} key={funcoes.id} >{funcoes.funcoes}</option>
                )
              })}
              </select>
            </div>
            <div className="mb-5">
              <label htmlFor="classes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Classe:</label>
              <select value={data.id_classe} //onChange={(e) => setIdClasse(e.target.value)}
               name="id_classe"
               onChange={valueInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled selected> Selecione Uma opção</option>
              {classes.map((classes) => {
                return (
                  
                  <option id="classes" 
                  name="id_classe"
                  onChange={valueInput}
                  value={classes.id} key={classes.id} >{classes.classes}</option>
                )
              })}
              </select>
            </div>
        </div>
        <label htmlFor="ativo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Ativo</label>
               <div className="mb-5">
              <select value={data.ativo} //onChange={(e) => setIdClasse(e.target.value)}
               name="ativo"
               onChange={valueInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" disabled selected> Selecione Uma opção</option>
                <option id="ativo" 
                  name="ativo"
                  //value={data.ativo}
                  onChange={valueInput}
                   value={true} 
                   >Ativo</option>
               <option id="ativo" 
                  name="ativo"
                  //value={data.ativo}
                 onChange={valueInput}
                   value={false} 
                   >Inativo</option>
              </select>
              {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
            </div>
            <button type="submit"
            className="text-white bg-slate-500 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800" 
            >Salvar</button>
  
      
    </form>
  </div>
</dialog>

           
            </>
            )
            })}


            
        </tbody>
    </table>
</div>
            <ToastContainer />
        </>
    )
}