import { useState } from "react"
import { api } from "../../services/apiClient"
import { useContext } from "react"
import { AuthContext } from "../../autenticacao/AuthProvider"
import { Navigate } from "react-router-dom"


export const Menu = () => {
    const { isAuthenticated} = useContext(AuthContext)
    const [classes, setClasses] = useState()


    if (!isAuthenticated) {
        return  <Navigate to="/" replace />;
       }


    async function handleClasse(e){
        e.preventDefault();

        let data = {
            classes
        }

        await api.post('/classe', data)
                .then((response) => {
                    //console.log('Classe cadastrada com sucesso!')
                    setClasses('')
                }).catch((error) => {
                    console.log('Erro ao cadastrar classe!')
                })
 
    }


    return (
        <div>
        <form onSubmit={handleClasse}>
          <div>
            <input
              id="classe"
              type="text"
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          {/* <Button props="/">Cancelar</Button> */}
        </form>
        
      </div>
    )


}
