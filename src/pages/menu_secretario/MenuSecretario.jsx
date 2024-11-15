import { AuthContext } from "../../autenticacao/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";



export const MenuSecretario = () => {
    const { isAuthenticated, user} = useContext(AuthContext)

    //console.log(user)
    

    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }

    return (
        <>
                <div className="mx-2 my-3">
            <Link to="/"  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >Voltar</Link>
        {/* <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
             onClick={handleBack}
             ><h5>Voltar</h5></button> */}
    </div>
        <div className="m-40 max-w-sm mx-auto">
            <Link to="/cadastro" className="block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Cadastrar</h5></Link>
            <Link to="/relatorio" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Relatório</h5></Link>
            <Link to="/menu_user" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Relatório Professor</h5></Link>            
            <Link to="/menu_alterar_erro" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Alterar Relatório do Dia</h5></Link>     
            <Link to="/alterar/dados/alunos_professores" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Alterar Dados Alunos/Professores</h5></Link>  
        </div>
        </>
    )
}