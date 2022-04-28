import styles from './SubmitBtn.module.css'
function SubmitBtn({ text }) {
    return (
        <button className={styles.btn}>{text}</button>
    )
}

export default SubmitBtn;