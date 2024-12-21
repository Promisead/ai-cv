export const validToken = (expiry)=>{
    //get the token from the store 
    //check if its greater than current seconds 
    //if it is,it is not expired
    //else it is expired
    let expiryTime = expiry
    
}


export const hashFun = (num) => {
    let numArr = []
    for (let char of num) {
        numArr.push(char)
    }
    let hash = ""
    for (let i = 0; i < numArr.length; i++) {
        if (i < numArr.length - 2) {
            hash = hash + "*"
        } else {
            hash = hash + numArr[i]
        }
    }
    return hash

}



export const truncate = (str, len) => {
    if (str.length > len) {
        if (len <= 3) {
            return str.slice(0, len - 3) + "..";
        }
        else {
            return str.slice(0, len) + "...";
        };
    }
    else {
        return str;
    };
};