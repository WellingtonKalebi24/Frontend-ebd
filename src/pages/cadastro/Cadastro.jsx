import { AuthContext } from "../../autenticacao/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export const Cadastro = () => {
    const { isAuthenticated, user} = useContext(AuthContext)
    const navigate = useNavigate;

    //console.log(user)
    

    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }



    return (
        <>
                        <div className="mx-2 my-3">
            <Link to="/menu_secretario"  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >Voltar</Link>
        {/* <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
             onClick={handleBack}
             ><h5>Voltar</h5></button> */}
    </div>
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