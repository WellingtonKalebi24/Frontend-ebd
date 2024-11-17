import { AuthContext } from "../../autenticacao/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const MenuUserSecretarioRel = () => {
    const { isAuthenticated, signOut} = useContext(AuthContext)
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
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
        <div className="m-39 max-w-sm mx-auto">

            <Link to="/presenca/professores_secretario" className="block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Presença</h5></Link>
            <Link to="/oferta" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Oferta</h5></Link>
            <Link to="/visita" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Visitante</h5></Link>  
            <Link to="/biblia" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Bíblia</h5></Link> 
            <Link to="/revista" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Revista</h5></Link>       
        </div>
        </>
    )
}
