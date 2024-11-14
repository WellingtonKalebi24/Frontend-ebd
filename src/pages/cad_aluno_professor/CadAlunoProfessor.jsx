import { useContext, useState } from "react"
import { AuthContext } from "../../autenticacao/AuthProvider"
import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { api } from "../../services/apiClient"
import { useEffect } from "react"

export const CadAlunoProfessor = () => {
    const { isAuthenticated, user} = useContext(AuthContext)

    const [nm_pessoa, setNmpessoa] = useState('');

    const [dt_nasciment, setDataNascimento] = useState('')

    const [classes, setClasse] = useState([])
    const [id_classe, setIdClasse] = useState('');

    const [funcoes, setFuncoes] = useState([]);
    const [id_funcao, setIdfuncao] = useState('');
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

       async function handleAlunoProfessor(e){
        e.preventDefault();

        let ativo = true;

        let incrementodata = ':05.729Z'

        let dt_nascimento = dt_nasciment + incrementodata

        let data = {
             nm_pessoa,
            dt_nascimento,
            id_funcao,
            id_classe,
            ativo
        }
        //console.log(data)

        await api.post('/alunoProfessores', data)
                        .then((response) => {
                         
                            setNmpessoa('')
                            setDataNascimento('')
                            //console.log('salvo com sucesso!')
                            navigate(-1)
                           //navigate('/presenca')
                        })
                        .catch((error) => {
                            console.log('erro', error)
                        })

        //console.log(data)
 
    }


    const handleNavigate = () => {
      navigate(-1)
  }

    useEffect(() => {
        funcao()
        classe()
      },[])

    return (
        <>
        <div className="flex justify-center gap-7 pt-2">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Cadastrar Aluno/Professor</h1>
        </div>

        <div >
    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    onClick={handleNavigate}>Voltar</button>
    </div>
        <form className="max-w-sm mx-auto" onSubmit={handleAlunoProfessor}>
            <div className="mb-5">
            <label htmlFor="nm_pessoa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Nome</label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite o nome completo"
                id="nm_pessoa"
                type="text"
                value={nm_pessoa}
                onChange={(e) => setNmpessoa(e.target.value)}
              />
            <label htmlFor="data" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">* Data de Nascimento</label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Digite a data"
                id="data"
                type="datetime-local"
                value={dt_nasciment}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
             <div className="mb-5">
              <label htmlFor="funcao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Função:</label>
              <select value={id_funcao} onChange={(e) => setIdfuncao(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected> Selecione Uma opção</option>
              {funcoes.map((funcoes) => {
                return (
                  <option id="funcoes" value={funcoes.id} key={funcoes.id} >{funcoes.funcoes}</option>
                )
              })}
              </select>
            </div>
            <div className="mb-5">
              <label htmlFor="classes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Classe:</label>
              <select value={id_classe} onChange={(e) => setIdClasse(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled selected> Selecione Uma opção</option>
              {classes.map((classes) => {
                return (
                  <option id="classes" value={classes.id} key={classes.id} >{classes.classes}</option>
                )
              })}
              </select>
            </div>
            </div>
            <button type="submit"
            className="text-white bg-slate-500 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800" 
            >Salvar</button>
        </form>
        </>
    )
}