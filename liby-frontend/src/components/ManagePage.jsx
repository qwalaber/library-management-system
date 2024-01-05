import React, { useState, useEffect, useRef, useContext  } from "react";

import axios from "axios";
import { Tooltip } from "react-tooltip";
import Masonry from 'react-masonry-css';

import { AuthContext } from "../contexts/AuthContext";
import UserUpdateModal from "./modals/UserUpdateModal";

const endpoint = 'http://localhost:8080';

const ManagePage = () => {

  const { role } = useContext(AuthContext);

  const todayDate = new Date().setHours(0, 0, 0, 0);

  const tooltipRef = useRef(null);

  const masonryColumnBreakpoint = {
    default: 4,
    992: 2,
    768: 1
  };

  const [ users, setUsers ] = useState([]);
  const [ allUsers, setAllUsers ] = useState([]);
  const [ isUpdateMode, setIsUpdateMode ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState({});

  const dateFormatter = date => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();    
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const searchUsers = searchString => {

  const arr = allUsers.filter(user => {
    for (let key in user) {
        if (typeof user[key] === 'string' && user[key].toLowerCase().includes(searchString)) {
            return true;
        }
    }
    return user.transactions.some(transaction => {
      if (transaction.returnDate !== null) return false;
      for (let key in transaction) {
        let value = transaction[key];
        if (key === 'book' && value !== null) {
          for (let subKey in value) {
            if (typeof value[subKey] === 'string' && value[subKey].toLowerCase().includes(searchString)) return true;
          }
        }
      }
      return false;
    });
  });
  setUsers(arr);
}


  const fetchUserTrasactions = async (userId) => {
    try {
      const response = await axios.get(`${endpoint}/transactions/user/${userId}`);
      console.log("fetched users: ", response.data);
      return response.data;
    } catch (error) {
      console.error('Error in fetchUserTransactions:', error);
      return [];
    }
    // var userTransactions = [];
    // axios({
    //   method: "get",
    //   url: `${endpoint}/transactions/user/${userId}`
    // })
    // .then(res => {
    //     console.log("users in fetchUserTrasactions: ", res.data);
    //     userTransactions = res.data;
    // }) 
    // .catch(err => {
    //       console.error('Error in fetchUserTrasactions:', err);
    // });
    // return userTransactions;
  }

  const getBorrowComments = ( dueDate, isOverdue ) => {
    const dayCount = Math.ceil((dueDate - todayDate) / 1000/ 60/ 60/ 24);
    if(isOverdue) return `${-dayCount} Days`;
    else if (dayCount === 0) return `Due Today`;
    else return `${dayCount} days`;
  }

  const handleBookReturn = bookId => {
    // update book
    // update user
    // update transaction
    setUsers(prevUsers => prevUsers.map(user => ({
      ...user,
      books: user.books.map(book=> book.bookId === bookId ? { ...book, isReturned: true } : book )
      })
    ))
  }

  useEffect(()=>{
    axios({
      method: "get",
      url: `${endpoint}/users`
    })
    .then(res => {
        console.log("fetched users: ",res.data);
        setAllUsers(res.data);
        setUsers(res.data);
    }) 
    .catch(err => {
          console.error('Error fetching users:', err);
    });
  },[])

  return (<div className="manage-page bg-white" ref={tooltipRef}>
    <div className="container">
      <h3 className="text-center text-muted mb-5">Customers</h3>
      <div className="mb-4">
        <span className="position-relative">
          <input type="text" className="manage-searchbar border-0 bg-dark ps-sm-2 rounded-5 border-dark text-white" id="update-book-user-email-input" name="search-books" placeholder="Book ID, Name or User ID" onChange={e=>searchUsers(e.target.value.toLowerCase())}/>
          <i className="manage-searchbar-icon fa fa-search position-absolute top-50 translate-middle-y end-0 me-2" aria-hidden="true"></i>
        </span>
      </div>
      <Masonry
          breakpointCols={masonryColumnBreakpoint}
          className="d-flex my-masonry-grid"
          columnClassName="my-masonry-grid_column">
      {users.map((user, userIndex) => {
        return <div key={userIndex} className="masonry-item">
          <div className="manage-user-details card bg-dark p-2 pt-3 mb-3 text-white">
            <p className="fw-bold mb-0 fs-6">{user.userId}. {user.name} ({user.gender === "Female" ? "F" : user.gender === "Male" ? "M" : "O"})</p>
            <p className="mb-1">Email: <span className="mb-0">{user.email}</span></p>
            <p className="mb-1">Brithday: {user.birthdate}</p>
            <p className="mb-1">Address: {user.address}</p>
            <p className="mb-3">Sign up: {dateFormatter(user.membershipDate)}</p>
            <div className="row px-2 py-0">
              {user.transactions.map(transaction => {
                if(transaction.returnDate!==null) return null;
                const dueDate = new Date(transaction.dueDate).setHours(0, 0, 0, 0);
                const isOverdue = dueDate < todayDate;
                return <div key={transaction.transactionId} className="manage-user-book col-6 px-1" data-tooltip-id={`m-tooltip-${transaction.transactionId}`}>
                  <div className={`card book-card p-1 mb-2 ${transaction.isReturned ? "bg-light" : isOverdue ? "bg-danger text-white" : "bg-success text-white"}`} data-toggle="tooltip" data-placement="top">
                    <p className="manage-user-book-title fw-bold mb-0">{transaction.book.title.substring(0, 17)}</p>
                    <p className="manage-user-book-comments">{getBorrowComments(dueDate, isOverdue)}</p>
                    <Tooltip id={`m-tooltip-${transaction.transactionId}`} className={`${!transaction.book.isReturned ? `d-block` : `d-none` } m-tooltip-style`} delayShow={200} openEvents={{ click: true }} closeEvents={{ click: true }} globalCloseEvents={{ clickOutsideAnchor: true }} clickable={true}>
                      <div className="text-center">
                        <p>Would you like to mark {transaction.book.title} as returned?</p>
                        <button className="tooltip-button btn border-success rounded-5 text-success" onMouseDown={()=>handleBookReturn(transaction.book.bookId)}><i className="fa fa-check"></i></button>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              })}
            </div>
            <div className="d-flex align-items-end">
              <i className="fa-solid fa-pen-to-square ms-auto" onClick={()=>{setSelectedUser(user);setIsUpdateMode(true)}} style={{ cursor: 'pointer' }}></i>
              <UserUpdateModal isUpdateMode={isUpdateMode} setIsUpdateMode={setIsUpdateMode} user={selectedUser}/>
          </div>
        </div>
      </div>
      })}</Masonry>
    </div>
  </div>)
}

export default ManagePage;