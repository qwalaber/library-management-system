import React, { useEffect, useState } from "react";

import axios from "axios";
import ReactModal from "react-modal";

const booksApi = '';
const usersApi = '';

const UpdateBook = ( { isUpdateMode, setIsUpdateMode, book } ) => {

    const [ editedTitle, setEditedTitle ] = useState("");
    const [ editedAuthor, setEditedAuthor ] = useState("");
    const [ editedGenre, setEditedGenre ] = useState("");
    const [ editedSubject, setEditedSubject ] = useState("");
    const [ editedPublicationDate, setEditedPublicationDate ] = useState("");
    const [ editedLanguage, setEditedLanguage ] = useState("");
    const [ editedImagePath, setEditedImagePath ] = useState("");
    const [ bookUserEmail, setBookUserEmail ] = useState("");
    const [ users, setUsers ] = useState([]);

    const handleUpdateBook = e => {
        e.preventDefault();
        const updatedBook = {
          ...book,
          title: editedTitle,
          author: editedAuthor,
          genre: editedGenre,
          subject: editedSubject,
          publicationDate: editedPublicationDate,
          language: editedLanguage,
          imagePath: editedImagePath,
        }
        if(JSON.stringify(book)!== JSON.stringify(updatedBook)) axios
            .put(`${booksApi}/${updatedBook.id}`, updatedBook)
            .then(res => console.log(`User with ID ${updatedBook.id} updated successfully. `, res.data))
            .catch(err => console.error(`Error updated user with ID ${updatedBook.id}: `, err));
        
        if(bookUserEmail!=="") {
            if(users.find(user => user.email === bookUserEmail)) {
                // set book as borrowed
                // create borrow
                // update user
            }
        }
    }

    const handleBorrow = () => {}
    
    const deleteBook =  () => {
        axios
            .delete(`${booksApi}/${book.id}`)
            .then(res => console.log(`User with ID ${book.id} deleted successfully. `, res))
            .catch(err => console.error(`Error deleting user with ID ${book.id}: `, err));
    }

    useEffect(()=>{
        axios
            .get(usersApi)
            .then(res => setUsers(res.data))
            .catch(err => console.error(`Error fetching users: `, err));
    },[])
    
    return(
        <ReactModal isOpen={isUpdateMode} closeTimeoutMS={200}>
            <i className="fa-solid fa-xmark position-absolute end-0 pe-3" onClick={()=>{console.log(isUpdateMode);setIsUpdateMode(false)}} style={{ cursor: 'pointer' }}></i>
            <h4 className="position-absolute start-50 translate-middle-x">Edit Book</h4>
            <div className="">
                <form className="text-center w-100">
                    <div className="row py-0 pt-4 mt-5 mx-sm-5 px-sm-5">
                        <div className="col-sm-6 px-5">
                            <p>
                                <label htmlFor="update-title-input">Title </label> <br />
                                <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="update-title-input" name="title" maxLength="255" required defaultValue={book.title} onChange={e=>setEditedTitle(e.target.value)}/>
                            </p>
                            <p>
                                <label htmlFor="update-id-input">Id </label> <br />
                                <input type="email" className="text-center text-md-start ps-sm-2 rounded-4" id="update-id-input" name="id" disabled value={book.id}/>
                            </p>
                            <p>
                                <label htmlFor="update-author-input">Author </label> <br />
                                <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="update-author-input" name="author" maxLength="100" required defaultValue={book.author} onChange={e=>setEditedAuthor(e.target.value)}/>
                            </p>
                            <p>
                                <label htmlFor="update-genre-input">Genre </label> <br />
                                <select id="update-genre-input" name="genre" className="rounded-4 ps-sm-2" required defaultValue={book.genre} onChange={e=>setEditedGenre(e.target.value)}>
                                <option className="text-center text-md-start" value="" disabled selected hidden></option>
                                <option className="text-center text-md-start" value="Non-fiction">Non-fiction</option>
                                <option className="text-center text-md-start" value="Fiction">Fiction</option>
                                </select>
                            </p>
                            { book.isAvailable ? <p>
                                <label htmlFor="update-book-user-email-input">Borrower Email </label> <br />
                                <input type="email" className="text-center text-md-start ps-sm-2 rounded-4" id="update-book-user-email-input" name="bookUserEmail" maxLength="100" onChange={e=>setBookUserEmail(e.target.value)}/>
                            </p> : null}
                        </div>
                    <div className="col-sm-6 px-5">
                        <p>
                            <label htmlFor="update-subject-input">Subject </label> <br />
                            <select id="update-subject-input" name="subject" className="rounded-4 ps-sm-2" required defaultValue={book.subject} onChange={e=>setEditedSubject(e.target.value)}>
                            <option className="text-center text-md-start" value="" disabled selected hidden></option>
                            { ["Literature", "Science", "History", "Art", "Technology", "Mathematics", "Philosophy", "Psychology", "Business", "Health", "Self-help", "Poetry", "Thriller", "Romance", "Horror", "Mystery", "Fantasy"].map( (sj,k) => <option key={k} className="text-center text-md-start" value={sj}>{sj}</option>) }
                            </select>
                        </p>
                        <p>
                            <label htmlFor="update-language-input">Language </label> <br />
                            <select id="update-language-input" name="language" className="rounded-4 ps-sm-2" required defaultValue={book.language} onChange={e=>setEditedLanguage(e.target.value)}>
                                <option className="text-center text-md-start" value="" disabled selected hidden></option>
                                { ["English", "Chinese", "Tamil", "Malay", "Others"].map( (lg,l) => <option key={l} className="text-center text-md-start" value={lg}>{lg}</option>) }
                            </select>
                        </p>
                        <p>
                            <label htmlFor="update-image-path-input">Image path </label> <br />
                            <input type="text" className="text-center text-md-start ps-sm-2 rounded-4" id="update-image-path-input" name="imagePath" maxLength="255" required defaultValue={`book-covers/${book.coverImage}`} onChange={e=>setEditedImagePath(e.target.value)}/>
                        </p>
                        <p>
                            <label htmlFor="update-publication-date-input">Publication Date </label> <br />
                            <input type="date" className="text-center text-md-start ps-sm-2 rounded-4" id="update-publication-date-input" name="publicationDate"required defaultValue={book.publicationDate} onChange={e=>setEditedPublicationDate(e.target.value)}/>
                        </p>
                    </div>
                </div>
                <button className="btn btn-success me-1 mt-4" onClick={e=>handleUpdateBook(e)}>Save</button>
                <button className="btn btn-danger mt-4" onClick={()=>deleteBook}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </form>
        </div>
    </ReactModal>
    )
}

export default UpdateBook;