import { useState, useEffect } from 'react'
import Input from '../../form/input'
import Select from '../../form/select'
import SubmitBtn from '../../form/SubmitBtn'
import styles from './ProjectForm.module.css'
function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setCategories(data)
            }).catch((err) => console.log(err))


    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })

    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        })
    }
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type={'text'}
                text={'Nome do Projeto'}
                name={'name'}
                placeholder={"Insira o nome do projeto"}
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type={'number'}
                text={'Orçamento do Projeto'}
                name={'buget'}
                placeholder={"Insira o Orçamento do projeto"}
                handleOnChange={handleChange}
                value={project.buget ? project.buget : ''}
            />
            <Select
                name='category_id'
                text={'Selecione a Categoria'}
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''} />
            <SubmitBtn text={btnText} />
        </form>
    )
}

export default ProjectForm