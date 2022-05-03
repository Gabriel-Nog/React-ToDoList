import styles from '../pages/project/ProjectCard.module.css'

function ServiceCard({ id, name, cost, description, handleRemove }) {

    // const remove = (e) => {
    //     e.preventDefault();
    //     handleRemove(id);
    // }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
        </div>
    )
}

export default ServiceCard;