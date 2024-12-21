import React from 'react'
import styles from './Modal.module.css';
import { useSelector } from "react-redux";

let Modal = ({content,closeModal}) => {
      let { user,color } = useSelector(state => state.userAuth)
      



    return <div className={styles.modal_screen}>
        <div className={styles.modal_center}>
            <div className={styles.modal_input_card}  >
                <div className={styles.modal_heading_con}>
                    <p className={styles.modal_heading} >
                        {content}
                    </p>
                    <button className={styles.modal_button} onClick={closeModal}>
                    got it!
                </button>

                </div>
               

            </div>

        </div>

    </div>
}

export default Modal

