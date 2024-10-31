import { AuthContext } from "../../autenticacao/AuthProvider";
import { useContext } from "react";
import { Navigate, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";

export const BotaoVoltar = () => {
    const { isAuthenticated, user} = useContext(AuthContext)
    const navigate = useNavigate();
    
    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }
       




    const handleNavigate = () => {
        navigate(-1)
    }



    return (
        <>
        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={handleNavigate}>Voltar</button>
        </>
    )
}