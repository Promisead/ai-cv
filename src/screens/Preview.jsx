import React from "react";
import Preview1 from "./Preview1";
import Preview2 from "./Preview2";
import Preview3 from "./Preview3";
import Preview4 from "./Preview4";
import Preview5 from "./Preview5";
import { useParams } from "react-router-dom";


const CVPreview = () => {
    let { id } = useParams()
    
    if (id === 'template1') {
        return <Preview1 />
    } else if (id === 'template2') {
        return <Preview2 />
    } else if (id === 'template3') {
        return <Preview3 />
    }else if (id === 'template4') {
        return <Preview4 />
    }else if (id === 'template5') {
        return <Preview5 />
    }
};

export default CVPreview;
