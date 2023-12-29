import React, { useState } from "react";

import axios from "axios";
import ReactModal from "react-modal";

const usersApi = '';

const UpdateUserModal = ( { isUpdateMode, setIsUpdateMode, user } ) => {

    const [ editedName, setEditedName ] = useState("");
    const [ editedEmail, setEditedEmail ] = useState("");
    const [ editedGender, setEditedGender ] = useState("");
    const [ editedAddress, setEditedAddress ] = useState("");
    const [ editedBirthdate, setEditedBirthdate ] = useState("");

    const handleUpdateUser = e => {
        e.preventDefault();
        const editedUser = {
          ...user,
          name: editedName,
          gender: editedGender,
          email: editedEmail,
          birthdate: editedBirthdate,
          address: editedAddress
        }
        if(JSON.stringify(user)!== JSON.stringify(editedUser)) axios
            .put(`${usersApi}/${editedUser.id}`, editedUser)
            .then(res => console.log(`User with ID ${editedUser.id} updated successfully. `, res.data))
            .catch(err => console.error(`Error updated user with ID ${editedUser.id}: `, err));
    }
    
    const deleteUser =  () => {
        axios
            .delete(`${usersApi}/${user.id}`)
            .then(res => console.log(`User with ID ${user.id} deleted successfully. `, res))
            .catch(err => console.error(`Error deleting user with ID ${user.id}: `, err));
    }
    
    return(
        <ReactModal isOpen={isUpdateMode} closeTimeoutMS={200}>
            <i className="fa-solid fa-xmark position-absolute end-0 pe-3" onClick={()=>{setIsUpdateMode(false)}} style={{ cursor: 'pointer' }}></i>
            <h4 className="position-absolute start-50 translate-middle-x">Edit Customer</h4>
            <div className="">
                <form className="text-center w-100">
                    <div className="row py-0 pt-5 mt-5 mx-sm-5 px-sm-5">
                        <div className="col-sm-6 px-5">
                            <p>
                                <label htmlFor="update-name-input">Name </label> <br />
                                <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="update-name-input" name="name" maxLength="100" required defaultValue={user.name} onChange={e=>setEditedName(e.target.value)}/>
                            </p>
                            <p>
                                <label htmlFor="update-email-input">Email </label> <br />
                                <input type="email" className="text-center text-md-start ps-sm-2 rounded-4" id="update-email-input" name="email" title="Please enter a valid email address" required defaultValue={user.email} onChange={e=>setEditedEmail(e.target.value)}/>
                            </p>
                            <p>
                                <label htmlFor="update-birthdate-input">Birthdate </label> <br />
                                <input type="date" className="text-center text-md-start ps-sm-2 rounded-4" id="update-birthdate-input" name="birthdate" title="Please enter your full name" required defaultValue={user.birthdate} onChange={e=>setEditedBirthdate(e.target.value)}/>
                            </p>
                        </div>
                    <div className="col-sm-6 px-5">
                        <p>
                            <label htmlFor="update-gender-input">Gender </label> <br />
                            <select id="update-gender-input" name="gender" className="rounded-4 ps-sm-2" required defaultValue={user.gender} onChange={e=>setEditedGender(e.target.value)}>
                                <option className="text-center text-md-start" value="" disabled selected hidden></option>
                                <option className="text-center text-md-start" value="Female">Female</option>
                                <option className="text-center text-md-start" value="Male">Male</option>
                                <option className="text-center text-md-start" value="Other">Other</option>
                            </select>
                        </p>
                        <p>
                            <label htmlFor="update-address-input">Address </label> <br />
                            <textarea type="address" className="text-center text-md-start ps-sm-2 rounded-4" id="update-address-input" name="address" maxLength="255" title="Please enter a valid address (maximum 255 characters)" required defaultValue={user.address} onChange={e=>setEditedAddress(e.target.value)}/>
                        </p>
                    </div>
                </div>
                <button className="btn btn-success me-1 mt-5" onClick={e=>handleUpdateUser(e)}>Save</button>
                <button className="btn btn-danger mt-5" onClick={()=>deleteUser}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </form>
        </div>
    </ReactModal>
    )
}

export default UpdateUserModal;