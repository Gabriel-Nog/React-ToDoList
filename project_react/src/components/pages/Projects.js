import { useLocation } from "react-router-dom";
import Message from "../layuot/Message";

import styles from "./Projects.module.css";
import Container from "../layuot/Container";
import LinkButton from "../layuot/LinkButton";
function Projects() {

    const location = useLocation();
    let message = '';
    if (location.state) {
        message = location.state
    }
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to={'/newproject'} text={"Criar Projeto!"} />
            </div>
            {message && <Message msg={message} type="success" />}
            <Container customClass="start">
                <p>Projetos...</p>
            </Container>
        </div>
    )
}

export default Projects;