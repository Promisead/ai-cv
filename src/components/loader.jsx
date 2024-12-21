import React from 'react'
import styles from './loader.module.css'
import Spinner from "react-activity/dist/Spinner"
import "react-activity/dist/Spinner.css";
import { useSelector } from "react-redux";



let Loader = () => {
    let { user,color } = useSelector(state => state.userAuth)
    return <div className={styles.modal_screen}>
        <div className={styles.modal_center}>
            <div className={styles.modal_input_card}>
                <div className={styles.modal_heading_con}>
                    <Spinner size={50} speed={.7}  className={styles.loader} />
                </div>
            </div>

        </div>

    </div>
}

export default Loader