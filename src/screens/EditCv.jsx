import React from "react";
import EditCV1 from "./EditCv1";
import EditCV2 from "./EditCv2";
import EditCV3 from "./EditCv3";
import EditCV4 from "./EditCv4";
import EditCV5 from "./EditCv5";
import { useParams } from "react-router-dom";


const EditCV = () => {
    let { id } = useParams()
    if (id === 'template1') {
        return <EditCV1 />
    } else if (id === 'template2') {
        return <EditCV2 />
    } else if (id === 'template3') {
        return <EditCV3 />
    } else if (id === 'template4') {
        return <EditCV4 />
    } else if (id === 'template5') {
        return <EditCV5 />
    } 
};

export default EditCV;