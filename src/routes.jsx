import { Biblia } from "./pages/biblia";
import { Home } from "./pages/home";
import { MenuUser } from "./pages/menu_user";
import { Oferta } from "./pages/oferta";
import { Presenca } from "./pages/presenca";
import { createBrowserRouter, Routes} from 'react-router-dom';
import { Visita } from "./pages/visitante";
import { MenuSecretario } from "./pages/menu_secretario";
import { Relatorio } from "./pages/relatorio";
import { Cadastro } from "./pages/cadastro";
import { CadClasse } from "./pages/cad_classe/CadClasse";
import { CadAlunoProfessor } from "./pages/cad_aluno_professor/CadAlunoProfessor";
import { Usuario } from "./pages/login";
import { MenuAlterarErro } from "./pages/menu_alterar_erro/MenuAlterarErro";
import { AlterarBiblia } from "./pages/alterar/alterar_biblia/AlterarBiblia";
import { Revista } from "./pages/revista/Revista";
import { AlterarDadosAlunosProf } from "./pages/alterar/alterar_dados_aluno_prof";
import { AlterarOferta } from "./pages/alterar/alterar_oferta";
import { AlterarVisita } from "./pages/alterar/alterar_visita";
import { AlterarRevista } from "./pages/alterar/alterar_revista";
import { MenuUserSecretarioRel } from "./pages/menu_user_secretario";
import { PresencaProfClass } from "./pages/presencaProfClass";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        
    },
    {
        path: "/menu_user",
        element: <MenuUser />,
    },
    {
        path: "/presenca",
        element: <Presenca />,
    },
    {
        path: "/oferta",
        element: <Oferta />
    },
    {
        path: "/biblia",
        element: <Biblia />
    },
    {
        path: "/visita",
        element: <Visita />
    },
    {
        path: "/menu_secretario",
        element: <MenuSecretario />
    }, 
    {
        path: "/relatorio",
        element: <Relatorio />
    },
    {
        path: "/cadastro",
        element: <Cadastro />
    }, 
    {
        path: "/classe",
        element: <CadClasse />
    }, 
    {
        path: "/cad_aluno_professor",
        element: <CadAlunoProfessor /> 
    },
    {
        path: "/usuario",
        element: <Usuario />
    },
    {
        path: "/revista",
        element: <Revista />
    },
    {
        path: "/menu_alterar_erro",
        element: <MenuAlterarErro />
    },
    {
        path: "/alterar_biblia/:idescola",
        element: <AlterarBiblia />
    }, 
    {
        path: "/alterar/dados/alunos_professores",
        element: <AlterarDadosAlunosProf />
    }, {
           path: "/alterar_oferta/:idescola",
           element: <AlterarOferta /> 
    },
    {
        path: "/alterar_visita/:idescola",
        element: <AlterarVisita />
    },
    {
        path: "/alterar_revista/:idescola",
        element: <AlterarRevista />
    }, 
    {
        path: "/menu_user/secretario_rel",
        element: <MenuUserSecretarioRel />
    },
    {
        path: "/presenca/professores_secretario",
        element: <PresencaProfClass />
    }

]);

export default router