import { useContext } from "react"
import { useState, useEffect } from "react"
import { AuthContext } from "../../autenticacao/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom"
import { api } from "../../services/apiClient"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MenuUser } from "../menu_user/MenuUser"



export const Home = () => {
    const { signIn, isAuthenticated} = useContext(AuthContext)

    const [id_funcao, setIdfuncao] = useState('');
    const [nm_pessoa, setNmpessoa] = useState("");
    const [senha, setSenha] = useState("");

    const [funcoes, setFuncoes] = useState([])
    const navigate = useNavigate()

    //const [loading, setLoading] = useState(false)


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

    async function handleLogin(e){
        e.preventDefault();


          
      

        let data = {
            id_funcao,
            nm_pessoa,
            senha
        }

        await signIn(data)
        //console.log(isAuthenticated)
        if(!!isAuthenticated) {
          toast.success("Login realizado com sucesso!")
          if (id_funcao === 'ecc118a1-48ed-4000-a0f9-2a7b98786771')  {
             navigate('/menu_secretario');
            }
          else {
            navigate('/menu_user');
          }
        } else {
          toast.error("Função, Nome ou senha inválidos!")
        } 
 
    }

    useEffect(() => {
      funcao()
    },[])


    return (
        <>
         <div className="flex justify-center gap-7 pt-2">
              <img className="object-cover object-center"
      src="data:image/jpeg;base64,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"
      alt="icon image" 
      />
        </div>
        <form onSubmit={handleLogin} className="max-w-sm mx-auto">
       
            <div className="mb-5">
              <label htmlFor="funcao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Função:</label>
              <select value={id_funcao} onChange={(e) => setIdfuncao(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option value="" disabled selected> Selecione Uma opção</option>
              {funcoes.map((funcoes) => {
                return (
                  
                  <option id="funcoes" value={funcoes.id} key={funcoes.id} >{ 
                    funcoes.funcoes
                    }</option>
                )
              })}
              </select>
            </div>
            <div className="mb-5">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome:</label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="nome.sobrenome"
                id="nmpessoa"
                type="text"
                value={nm_pessoa}
                onChange={(e) => setNmpessoa(e.target.value)}
              />
            </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha:</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button type="submit"
            className="text-white bg-slate-500 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800" >Login</button>
          {/* <Button props="/">Cancelar</Button> */}
          <ToastContainer />
        </form>
        
        </>
    )
}