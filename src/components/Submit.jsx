import React from 'react'
import styles from './Submit.module.css'

const SubmitBtn = (props) => {
    return <button className={styles.btn_container} style={props.style} onClick={props.onClick ? props.onClick : () => { }}>
        <p className={styles.text} style={{
            color: props.buttonTextColor ? props.buttonTextColor : '#fff',
            margin: 'auto',
            display: 'inline',
            fontSize: '1.2rem',
            paddingTop: '9px',
            paddingBottom: '9px',

        }}>{props.text}</p>
    </button>
}

export default SubmitBtn