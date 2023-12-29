import React, { useState, useContext, useEffect } from "react";

import { AuthContext } from "../AuthContext";
import { useNavigate } from 'react-router-dom';

import UsersDataDummy from "./../assets/data/UsersDataDummy";
import LibrariansDataDummy from "./../assets/data/LibrariansDataDummy";

import NewUserModal from "./modals/NewUserModal";

const LoginPage = () => {

    const navigate = useNavigate();

    const { logIn } = useContext(AuthContext);
    
    const [ users, setUsers ] = useState(UsersDataDummy);
    const [ librarians, setLibrarians ] = useState(LibrariansDataDummy);
    const [ isLogInError, setIsLogInError ] = useState(false);
    const [ logInErrorMessage, setLogInErrorMessage ] = useState("");
    const [ isRegistrationModalOpen, setIsRegistrationModalOpen ] = useState(false);

    const handleLogIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value; 
        let role = "";

        if(librarians.find(librarian => librarian.email === email && librarian.password===password)) {
            role = "Librarian";
            navigate('/users')
        } else if(users.find(user => user.email === email && user.password===password)) {
            role = "User";
            navigate('/history')
        } else {
            setIsLogInError(true);
            setLogInErrorMessage("Invalid email or password.");
            return
        };
        logIn({ email, password }, role);
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
            {isLogInError && <div className="login-form-width text-center bg-danger rounded-2 mx-auto text-white my-2" style={{opacity: 0.6}}>{logInErrorMessage}</div>}
            <span onClick={()=>setIsRegistrationModalOpen(true)} className="sign-up-prompt text-center text-muted fst-italic mt-1">No Account Yet, Sign Up?</span>
            <NewUserModal isRegistrationModalOpen={isRegistrationModalOpen} setIsRegistrationModalOpen={setIsRegistrationModalOpen}/>
        </div>
    </div>
</div>)
}

export default LoginPage;