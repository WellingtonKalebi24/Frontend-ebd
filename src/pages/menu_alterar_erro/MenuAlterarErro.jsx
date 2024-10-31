import { AuthContext } from "../../autenticacao/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { api } from "../../services/apiClient";
import { useParams } from "react-router-dom";

export const MenuAlterarErro = () => {
    const { isAuthenticated} = useContext(AuthContext)

    const { idescola } = useParams();
    //console.log(user)
    const [classes, setClasse] = useState([])
    const [id_classe, setIdClasse] = useState('');



    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }

       const classe = async () => {
        try {
            const responseClasse = await api.get('/classe');
  
            //console.log(responseClasse.data);
  
            //const { id , funcoes } = responseFunc.data;
            setClasse(responseClasse.data)
           //console.log(idescola)
        } catch (error) {
            console.log("erro ao funções", error)
        }
    }

       useEffect(() => {
        classe()
      },[])

    return (
        <>
        <div className="m-40 max-w-sm mx-auto">
        <div className="mb-5">
              <select value={id_classe} onChange={(e) => setIdClasse(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {classes.map((classes) => {
                return (
                  <option id="classes" value={classes.id} key={classes.id} >{classes.classes}</option>
                )
              })}
              </select>
            </div>
        <Link to="/alterar_presenca/" className="block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Presença</h5></Link>
            <Link to="/alterar_oferta" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Oferta</h5></Link>
            <Link to="/alterar_visita" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Visitante</h5></Link>  
            <Link to={"/alterar_biblia/"+id_classe}  className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Bíblia</h5></Link>    
            <Link to="/alterar_biblia" className="mt-8 block max-w-sm p-6 bg-amber-300 border border-gray-200 rounded-lg shadow-md hover:bg-amber-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Revista</h5></Link>    
               
        </div>
        </>
    )
}