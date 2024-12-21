export const validateEmail = (data)=>{
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
    }else if(!data.match(/^\w+([\.-]?w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        error="email is not valid"
    }
    else{
        error = ""
    }
    return error
}

export const validateText = (data)=>{
    
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
        return error
    }
    
    else{
        error = ""
        return error
    }
    
}
export const validatePhoneNumber = (data)=>{
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
    }
   
    else if(!data.match(/[0-9]/g)){
        error="number is not valid"
    }
    else{
        error = ""
    }
    return error
}




export const validatePassword = (data)=>{
    
    let error = ""
    if(data.length === 0 ){
        error="field should not be empty"
        return error
    }
    else if(data.length < 7 ){
        error="password should be 7 characters"
        return error
    }
     
   
    else{
        error = ""
        return error
    }
    
}

export const addTrailingSpaces = (stringToFormat)=>{
    let newString = stringToFormat.split('')
    let str = []
    for(let i =0;i< newString.length;i++){
        if(i == 3 || i === 7 || i == 11){
            str.push(newString[i])
            str.push(" ")
        }else{
            str.push(newString[i])
        }
    }
    return str.join("")


}

