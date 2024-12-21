import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import FormInput from '../components/Input';
import SubmitBtn from '../components/Submit';
import { login } from '../store/action/userAppStorage';




function LoginPage() {
    let [userEmail, setUserEmail] = useState("")
    let [userEmailError, setUserEmailError] = useState("")
    let [userPassword, setUserPassword] = useState("")
    let [userPasswordError, setUserPasswordError] = useState("")
    let [preloader, setPreloader] = useState(true)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [isUrl, setIsUrl] = useState(false)
    //initialising reduzx
    let dispatch = useDispatch()
    let { color } = useSelector(state => state.userAuth)
    //initialise router
    let navigate = useNavigate()
    //loaders state

    const toSignUp = () => {
        navigate('/signup')
    }

    const toForget = () => {
        navigate('/forgetpassword')
    }


    let isFormValid = userEmail && !userEmailError && userPassword


    useEffect(() => {
        setTimeout(() => {
            setPreloader(false)
        }, 5000)

    }, [])



    let setFormDetails = useCallback(e => {
        setIsError(false)
        if (e.formName === "userEmail") {

            let formValue = e.value
            setUserEmail(formValue)
            setUserEmailError(e.error)

        } else if (e.formName === "userPassword") {

            let formValue = e.value
            setUserPassword(formValue)
            setUserPasswordError(e.error)
        }
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(userEmail)
        if (!isFormValid) {
            return
        }
        setIsLoading(true)

        let response = await dispatch(login({
            email: userEmail,
            password: userPassword
        }))

        if (!response.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(response.message)
            setIsUrl(response.url)
        }
        setIsLoading(false)
        setIsError(true)
        setIsErrorInfo(response.message)
        setIsUrl(response.url)
    }



    let closeModal = () => {
        setIsError(false)
        if (isUrl) {
            navigate(isUrl)
        }
    }

    let navigateBackward = () => {
        navigate(-1)
    }

    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',width:'100vw'}} >
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
            
                <div className="col-md-6 col-sm-12 col-lg-4">
                    <form onSubmit={submitHandler} className="border p-4 shadow rounded bg-light">

                        <div className="d-flex align-items-center mb-4">
                            <span className="material-icons me-2" onClick={navigateBackward}></span>
                            <h2 className="mb-0">Login</h2>
                        </div>

                        <div className="mb-3">
                            <FormInput
                                icon="edit"
                                type="email"
                                formName="userEmail"
                                placeholder="Email"
                                setFormDetails={setFormDetails}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <FormInput
                                icon="edit"
                                type="password"
                                formName="userPassword"
                                placeholder="Password"
                                setFormDetails={setFormDetails}
                                className="form-control"
                            />
                        </div>


                        <div className="d-grid">
                            <SubmitBtn className="btn btn-primary" style={{ borderRadius: '20px' }} text="Login" />
                        </div>


                        <p className="mt-3 text-center">
                            Don't have an account? <span className="text-primary" onClick={toSignUp} style={{ cursor: 'pointer' }}>Signup</span><br />

                        </p>
                    </form>
                </div>

           
        </div>


    );

}


export default LoginPage