import { useLocation } from "react-router-dom";
import Message from "../layuot/Message";
import styles from "./Projects.module.css";
//Componentes
import Container from "../layuot/Container";
import LinkButton from "../layuot/LinkButton";
import ProjectCard from "./project/ProjectCard";
import { useState, useEffect } from "react";
import Loading from "../layuot/Loading";
function Projects() {

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('');
    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }
            )
                .then(res => res.json())
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err));

        }, 1500)
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json)
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id))
                //Mensagem
                setProjectMessage("Projeto Excluído!")
            })
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to={'/newproject'} text={"Criar Projeto!"} />
            </div>
            {message && <Message msg={message} type="success" />}
            {projectMessage && <Message msg={projectMessage} type="success" />}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) =>
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        handleRemove={removeProject}
                    />
                )}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há Projetos Cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Projects;