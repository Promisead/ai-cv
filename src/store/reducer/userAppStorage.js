import { FaCcVisa } from "react-icons/fa";
import { LOGIN_USER, OPEN_CV } from "../action/userAppStorage";
import { GENERATE_CV, FETCH_CVS, UPDATE_USER, UPDATE_CV, DELETE_CV, REFRESH_LOGIN, LOGOUT } from "../action/userAppStorage";


const initialState = {
    userToken: '',
    user: null,
    cv: null,
    isCvAvailable: false,
    cvs: []
}


export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {
                userToken: '',
                user: null,
                cv: null,
                isCvAvailable: false,
                cvs: []
            }
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload.user,
                userToken: action.payload.userToken,
            }

        case REFRESH_LOGIN:
           
            return {
                ...state,
                user: action.payload.user,
                userToken: action.payload.response,
            }

        case GENERATE_CV:
            return {
                ...state,
                cv: action.payload.cv,
                cvs: [...state.cvs, action.payload.cv],
                isCvAvailable: true
            }

        case OPEN_CV:
            console.log(action.payload)
            return {
                ...state,
                cv: action.payload,
                isCvAvailable: true
            }

        case FETCH_CVS:
            return {
                ...state,
                cvs: action.payload,
            }

        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }


        case UPDATE_CV:
            // Find the CV that matches the provided id
            let emptyArr = []

            for(let mem of state.cvs){
                console.log(mem)
                if(mem._id === action.payload.cv._id){
                    emptyArr.push(action.payload.cv)
                } else{
                    emptyArr.push(mem)
                }

            }

            

            return {
                ...state,
                cvs:  emptyArr,
                cv:action.payload.cv
            };
        case DELETE_CV:
            return {
                ...state,
                cvs: state.cvs.filter(cv => cv.id !== action.payload.id),
            };



        default:
            return state
    }

}

