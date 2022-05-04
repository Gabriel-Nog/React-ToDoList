import styles from "./Project.module.css"
import { parse, v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layuot/Loading"
import Container from "../layuot/Container"
import ProjectForm from "../pages/project/ProjectForm"
import Message from "../layuot/Message"
import ServiceForm from "../services/ServiceForm";
import ServiceCard from "../services/ServiceCard";

const Project = () => {
    const { id } = useParams()
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log(err))
    }, [id])

    const [showProjectForm, setShowProjectForm] = useState(false)
    function ToggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function editPost(project) {
        setMessage('');
        if (project.budget < project.cost) {
            setMessage(`O orçamento não pode ser menor que o custo do projeto! Custo Total: R$${project.cost}`)
            setType("error")
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(res => res.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
                setShowProjectForm(false)
                //Mensagem
                setMessage('Projeto Atualizado!')
                setType("success")
            })
            .catch(err => console.log(err))

    }

    //Serviços
    const [showServiceForm, setShowServiceForm] = useState(false)
    function ToggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }
    function createService(project) {
        setMessage('');
        //Último serviço

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //Validação de orçamento
        if (newCost > parseFloat(project.budget)) {
            setMessage(`O serviço, ${lastService.name}, extrapolou o Orçamento em R$${parseFloat(lastServiceCost) - parseFloat(project.budget)}`)
            setType('error')
            project.services.pop()
            return false
        }

        //Adicionando Serviços
        project.cost = newCost

        //Update no banco
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then((res) => res.json())
            .then(() => {
                setMessage('Serviço Adicionado!')
                setType('success')
                setShowServiceForm(false)
            })
            .catch((err) => console.log(err))
    }

    //Removendo Serviço
    function remove(id, cost) {
        setMessage('');
        const serviceUpdate = project.services.filter((service) =>
            service.id !== id
        )

        const projectUpdate = project

        projectUpdate.services = serviceUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)


        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectUpdate)
        })
            .then((res) => res.json())
            .then(() => {
                setProject(projectUpdate)
                setServices(serviceUpdate)
                setMessage("Serviço Excluído")
                setType("success")
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>
                                Projeto: {project.name}
                            </h1>
                            <button onClick={ToggleProjectForm} className={styles.btn}>
                                {!showProjectForm ? `Editar ${project.name}` : "Fechar"}
                            </button>
                            {
                                !showProjectForm ?
                                    (
                                        <div className={styles.project_info}>
                                            <p>
                                                <span>Categoria:</span> {project.category.name}
                                            </p>
                                            <p>
                                                <span>Orçamento:</span> R${project.budget}
                                            </p>
                                            <p>
                                                <span>Total Utilizado:</span> R${project.cost}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className={styles.project_info}>
                                            <ProjectForm
                                                handleSubmit={editPost}
                                                btnText={"Editar"}
                                                projectData={project}
                                            />
                                        </div>
                                    )
                            }
                        </div>
                        <div className={styles.services_container}>
                            <h2>Adicione um Serviço!</h2>
                            <button onClick={ToggleServiceForm} className={styles.btn}>
                                {!showServiceForm ? `Adicionar Serviço` : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        Btntext={"Adicionar Serviço"}
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 && services.map((service) =>
                                <ServiceCard
                                    key={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    id={service.id}
                                    handleRemove={remove}
                                />)}
                            {services.length === 0
                                &&
                                <p>Não há serviços em {project.name}</p>
                            }
                        </Container>
                    </Container>
                </div >
            ) : <Loading />}
        </>
    )
}

export default Project; 