import styles from './styles.module.scss';

export function Inputs({
    label,
    type,
    changeState,
    value
}) {
    return (
        <div className={styles.boxInput}>
            <label>{label}</label>
            <input 
            type={type}
            onChange={(e) => changeState(e.target.value)}
            value={value}
            />
        </div>
    )
}