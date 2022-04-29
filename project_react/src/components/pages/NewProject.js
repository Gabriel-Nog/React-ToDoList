import styles from './NewProject.module.css';
import { useNavigate } from 'react-router-dom'
import ProjectForm from './project/ProjectForm';

function NewProject() {

    const navigate = useNavigate();

    function createPost(project) {
        //Initialize Costs e Services

        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                navigate('/projects', { state: 'Projeto Enviado!' })
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>
                Criar Projeto
            </h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText={"Criar Projeto"} />
        </div>
    )
}

export default NewProject;