import styles from './input.module.css'
function Input({ type, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input
                type={text}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value || ''} />
        </div>
    )
}

export default Input