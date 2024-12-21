import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/Input';
import SubmitBtn from '../components/Submit';
import {signup } from '../store/action/userAppStorage';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";


function SignupPage() {
    let [userEmail, setUserEmail] = useState("")
    let [userEmailError, setUserEmailError] = useState("")
    let [userPassword, setUserPassword] = useState("")
    let [userConfirmPassword, setUserConfirmPassword] = useState("")
    let [userPasswordError, setUserPasswordError] = useState("")
    let [userConfirmPasswordError, setUserConfirmPasswordError] = useState("")
    let [preloader, setPreloader] = useState(true)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [isUrl, setIsUrl] = useState(false)

    let [username, setusername] = useState("")
    let [fullName, setFullName] = useState("")

    let [usernameError, setusernameError] = useState("")
    let [fullNameError, setFullNameError] = useState("")
    //initialising reduzx
    let dispatch = useDispatch()
    let { color } = useSelector(state => state.userAuth)
    //initialise router
    let navigate = useNavigate()
    //loaders state

    const toSignIn = () => {
        navigate('/Login')
    }

    const toForget = () => {
        navigate('/forgetpassword')
    }


    let isFormValid = userEmail && !userEmailError && userPassword && userConfirmPassword && !userPasswordError && !userConfirmPasswordError && username && !usernameError && fullName && !fullNameError 

    let formError = (userConfirmPassword.length === 7 && userPassword !== userConfirmPassword)?'Password does not match':''


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
        }else if (e.formName === "userConfirmPassword") {

            let formValue = e.value
            setUserConfirmPassword(formValue)
            setUserConfirmPasswordError(e.error)
        }if (e.formName === "username") {

            let formValue = e.value
            setusername(formValue)
            setusernameError(e.error)

        }if (e.formName === "fullName") {

            let formValue = e.value
            setFullName(formValue)
            setFullNameError(e.error)

        }
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault()
        if (!isFormValid) {
            return
        }
        setIsLoading(true)

        let response = await dispatch(signup({
            email: userEmail,
            password: userPassword,
            username:username,
            fullName:fullName
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
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',width:'100vw'}}>
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
            
                <div className="col-md-6 col-sm-12 col-lg-4 " style={{marginTop:'250px'}}>
                    <form onSubmit={submitHandler} className="border p-4 shadow rounded bg-light">

                        <div className="d-flex align-items-center mb-4">
                            <span className="material-icons me-2" onClick={navigateBackward}></span>
                            <h2 className="mb-0">Register</h2>
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
                                type="text"
                                formName="username"
                                placeholder="username"
                                setFormDetails={setFormDetails}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <FormInput
                                icon="edit"
                                type="text"
                                formName="fullName"
                                placeholder="Full name"
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

                        <div className="mb-3">
                            <FormInput
                                icon="edit"
                                type="password"
                                formName="userConfirmPassword"
                                placeholder="Confirm password"
                                setFormDetails={setFormDetails}
                                className="form-control"
                            />
                        </div>

                        <p>{userConfirmPassword.length> 0? formError:''}</p>


                        <div className="d-grid">
                            <SubmitBtn className="btn btn-primary" style={{ borderRadius: '20px' }} text="Sign Up" />
                        </div>


                        <p className="mt-3 text-center">
                            have an account? <span className="text-primary" onClick={toSignIn} style={{ cursor: 'pointer' }}>Signin</span><br />

                        </p>
                    </form>
                </div>

           
        </div>


    );

}


export default SignupPage