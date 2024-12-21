import React, {useCallback,useEffect } from "react"
import styles from './select.module.css'


const SelectInput = (props) => {
   /*useEffect(()=>{
        props.setFormDetails({
            value: e.target.value,
            formName: props.formName
        })
    },[props])*/
    

    let selectFunction = useCallback((e) => {
        props.setFormDetails({
            value: e.target.value,
            formName: props.formName
        })
    },[props])


    return <div className={styles.form_selectcontainer} >

        <div className={styles.categorybody}>
            <select className={styles.selectInput} onChange={selectFunction}  >
                {props.children}
            </select>
        </div>

    </div>

}




export default React.memo(SelectInput)