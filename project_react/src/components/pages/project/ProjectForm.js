import Input from '../../form/input'
import Select from '../../form/select'
import SubmitBtn from '../../form/SubmitBtn'
import styles from './ProjectForm.module.css'
function ProjectForm({ btnText }) {
    return (
        <form className={styles.form}>
            <Input
                type={'text'}
                text={'Nome do Projeto'}
                name={'name'}
                placeholder={"Insira o nome do projeto"}
            />
            <Input
                type={'number'}
                text={'Orçamento do Projeto'}
                name={'buget'}
                placeholder={"Insira o Orçamento do projeto"}
            />
            <Select name='categorY_id' text={'Selecione a Categoria'} />
            <SubmitBtn text={btnText} />
        </form>
    )
}

export default ProjectForm