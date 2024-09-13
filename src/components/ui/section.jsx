import { useState } from 'react'
import styles from './section.module.css'

export default function Section(props) {
    const { children, title, expanded } = props
    const empty = !(children?.props?.objs?.length>0)
    const [shown, setShown] = useState(expanded || empty)


    function toggleShow() {
        setShown(!shown)
    }

    return (
        <section className={
            [styles.section, shown && styles.expanded, empty && styles.empty].join(' ')
        }>
            <div className={styles.header}>
                <span className={styles.arrow} onClick={toggleShow}>{'▲'}</span>
                <h2>{title}</h2>
            </div>
            <div className={styles.body}>
                {children}
            </div>
        </section>
    )
}