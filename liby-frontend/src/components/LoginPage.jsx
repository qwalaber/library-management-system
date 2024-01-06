import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { AuthContext } from "../contexts/AuthContext";
import UserCreateModal from "./modals/UserCreateModal";

const endpoint = 'http://localhost:8080';

const LoginPage = () => {

    const navigate = useNavigate();

    const { logIn } = useContext(AuthContext);
    
    const [ logInErrorMessage, setLogInErrorMessage ] = useState("");
    const [ isRegistrationModalOpen, setIsRegistrationModalOpen ] = useState(false);

    const handleLogIn = e => {
        e.preventDefault();

        const loginCredentials = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log("loginCredentials", loginCredentials)
        axios({
            method: "post",
            url: `${endpoint}/login`,
            data: loginCredentials
        })
        .then(res=>{
            if(res.status) {
                if(res.data === "User logged in successfully") {
                    logIn(loginCredentials, "User");
                    navigate('/profile');
                } else if(res.data === "Librarian logged in successfully") {
                    logIn(loginCredentials, "Librarian");
                    navigate('/manage');
                }
            }
        })
        .catch(err=>{
            if(err.response) {
                console.log("Failed to log in: " + err.response.data);
                setLogInErrorMessage(err.response.data);
            }
            else {
                console.log("An error occured, please try again later " + err.message);
                setLogInErrorMessage("An error occurred. Please try again.");
            }
        })
    }

    return(<div className="login-page">
    <div className="container">
        <div className="row flex-column">
            <div className="login-form-width col mx-auto justify-content-center align-items-center rounded-5 bg-light login-form-wrapper pt-4 pb-4">
                <form onSubmit={e=>handleLogIn(e)} className="px-4 pt-1">
                    <div className="mb-2">
                        <input placeholder="Email" type="text" className="form-control" id="email" name="email"/>
                    </div>
                    <div className="mb-3">
                        <input placeholder="Password" type="password" className="form-control" id="password" name="password"/>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-dark">Log In</button>
                    </div>
                </form>
            </div>
            { logInErrorMessage!=="" && <div className="login-form-width text-center bg-danger rounded-2 mx-auto text-white my-2" style={{opacity: 0.6}}>{logInErrorMessage}</div>}
            <span onClick={()=>setIsRegistrationModalOpen(true)} className="sign-up-prompt text-center text-muted fst-italic mt-1">No Account Yet, Sign Up?</span>
            <UserCreateModal isRegistrationModalOpen={isRegistrationModalOpen} setIsRegistrationModalOpen={setIsRegistrationModalOpen}/>
        </div>
    </div>
</div>)
}

export default LoginPage;