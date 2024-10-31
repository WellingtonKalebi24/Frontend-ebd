import { AuthContext } from "../../autenticacao/AuthProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import generatePDF, { Margin} from "react-to-pdf";
import { useEffect, useState } from "react";
import { api } from "../../services/apiClient";

const personalizacao = {
    // Baixar/Salvar = save / Abrir no navegador = open
    method: 'open',
    page: {
        // Definir a margem: SMALL ou MEDIUM
        margin: Margin.MEDIUM,
        // default is 'A4 or letter'
        format: 'A4',
        // default is 'portrait or landscape'
        orientation: 'landscape',
     },
   }


const recuperarConteudoParaPDF = () => document.getElementById('conteudo');

export const Relatorio = () => {
    const { isAuthenticated, user} = useContext(AuthContext)

    const [relatorio, setRelatorio] = useState([])
    const [relatorioGeral, setRelatorioGeral] = useState([])

    //console.log(user)
    

    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }



       const relatorio_saida = async () => {
        try {
            const responseRelatorio = await api.get('/relatorio');
  
            //console.log(responseRelatorio.data);
  
            //const { id , funcoes } = responseFunc.data;
            setRelatorio(responseRelatorio.data)
        } catch (error) {
            console.log("erro ao funções", error)
        }
    }

    const relatorio_saida_geral = async () => {
        try {

            const responseRelatorioGeral = await api.get('/relatoriogeral');
  
            //console.log(responseRelatorio.data);
  
            //const { id , funcoes } = responseFunc.data;
            setRelatorioGeral(responseRelatorioGeral.data)
            console.log(relatorioGeral)
        } catch (error) {
            console.log("errosss ao funções", error)
        }
    }    

       useEffect(() => {
        relatorio_saida()
        relatorio_saida_geral()
       },[])

    return (
        <>
        <main>

        <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"        
         onClick={() => generatePDF( recuperarConteudoParaPDF, personalizacao)}>Download PDF</button>

        <div id="conteudo">
         

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Classes
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Matriculados
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Ausentes
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Presentes
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Visitas
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Total
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Bíblias
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Revistas
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Ofertas
                </th> 
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Porcentagem P.
                </th>     
            </tr>
        </thead>
        <tbody>
            {relatorio.map((relatorio) => {
                return ( 
                    <>
            <tr className="border-b border-gray-200 dark:border-gray-700">
                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                 {relatorio.classes}
                 </th>
                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorio.matriculados}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorio.ausente}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorio.presente}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorio.visita}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorio.total}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorio.biblia}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorio.revista}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorio.ofertas}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorio.porcentagem}
                </th>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
                
            </tr>
           
            </>
            )
            })}
        </tbody>
    </table>
</div>
<br></br>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
            <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Matriculados
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Ausentes
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Presentes
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Visitas
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Total
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Bíblias
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Revistas
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Ofertas
                </th>
                <th className="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    
                </th>                    
            </tr>
        </thead>
        <tbody>
            {relatorioGeral.map((relatorioGeral) => {
                return ( 
                    <>
            <tr className="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">

                </th>
                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorioGeral.matriculados}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorioGeral.ausente}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorioGeral.presente}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorioGeral.visita}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorioGeral.total}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorioGeral.biblia}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorioGeral.revista}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {relatorioGeral.ofertas}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">

                </th>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
                
            </tr>
           
            </>
            )
            })}
        </tbody>
    </table>
</div>

         </div>

        </main>
        </>
    )
}