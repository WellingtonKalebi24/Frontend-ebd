import { AuthContext } from "../../autenticacao/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";



export const Cadastro = () => {
    const { isAuthenticated, user} = useContext(AuthContext)

    //console.log(user)
    

    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }


    return (
        <>
        <div className="m-40 max-w-sm mx-auto">
            <Link to="/classe" className="block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Classe</h5></Link>
            <Link to="/cad_aluno_professor" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Aluno / Professor</h5></Link>
            <Link to="/usuario" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Login</h5></Link>     
        </div>
        </>
    )
}