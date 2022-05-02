import { useState } from "react";

import Input from "../form/input";
import SubmitBtn from "../form/SubmitBtn";

import styles from "../pages/project/ProjectForm.module.css"
function ServiceForm({ handleSubmit, Btntext, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData);
    }
    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type={"text"}
                text={"Nome Do Serviço"}
                name={"name"}
                placeholder={"Insira o Nome do Serviço"}
                handleOnChange={handleChange}
            />
            <Input
                type={"number"}
                text={"Custo Do Serviço"}
                name={"cost"}
                placeholder={"Insira o Valor do Serviço"}
                handleOnChange={handleChange}
            />
            <Input
                type={"text"}
                text={"Descrição Do Serviço"}
                name={"description"}
                placeholder={"Insira a Descrição do Serviço"}
                handleOnChange={handleChange}
            />

            <SubmitBtn text={Btntext} />
        </form>
    )
}

export default ServiceForm;