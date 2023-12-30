import React, { useState, useEffect, useRef, useContext  } from "react";

import axios from "axios";
import { Tooltip } from "react-tooltip";

import { AuthContext } from "../contexts/AuthContext";
import UserUpdateModal from "./modals/UserUpdateModal";

const endpoint = 'http://localhost:8080';

const ManagePage = () => {

  const { role } = useContext(AuthContext);

  const todayDate = new Date().setHours(0, 0, 0, 0);

  const tooltipRef = useRef(null);

  const [ users, setUsers ] = useState([]);
  const [ isUpdateMode, setIsUpdateMode ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState({});
  const [ searchKeyword, setSearchKeyword ] = useState({});

  const dateFormatter = date => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();    
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const fetchUserTrasactions = async (userId) => {
    try {
      const response = await axios.get(`${endpoint}/transactions/user/${userId}`);
      console.log("users in fetchUserTransactions: ", response.data);
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

  const getCardBodyData = ( dueDate, isOverdue ) => {
    const dayCount = Math.ceil((dueDate - todayDate) / 1000/ 60/ 60/ 24);
    if(isOverdue) return <p className="mb-0">Overdue by: {-dayCount} days</p>;
    else if (dayCount === 0) return <p className="mb-0">Due in: Today</p>;
    else return <p className="mb-0">Due in: {dayCount} days</p>;
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
        console.log("users list: ",res.data);
        setUsers(res.data)
    }) 
    .catch(err => {
          console.error('Error fetching users:', err);
    });
  },[])

  return (<div className="manage-page" ref={tooltipRef}>
    <div className="container">
      <div className="row">
        <h3 className="text-center text-muted mb-5">Customers</h3>
        <div className="col-sm-3 mb-4">
          <span>
            <button className="btn btn-info w-100  p-0 rounded-2">
                <i className="fa-solid fa-shuffle"></i> Filter
            </button>
          </span>
        </div>
        <div className="col-sm-2 mb-4">
          <span>
            <button className="btn btn-info w-100  p-0 rounded-2">
                <i className="fa-solid fa-arrow-down-wide-short"></i> Sort
            </button>
          </span>
        </div>
        <div className="col-sm-7 mb-4">
          <span className="position-relative">
            <input type="text" className="text-center bg-info ps-sm-2 rounded-5 border-dark border-0" id="update-book-user-email-input" name="search-books" placeholder="Book ID, Name or User ID" onChange={e=>setSearchKeyword(e.target.value)}/>
            <i className="fa fa-search position-absolute top-50 translate-middle-y end-0 me-2 text-muted text-white" aria-hidden="true"></i>
          </span>
        </div>
        {users.map((user, userIndex) => {
          return <div key={userIndex} className="col-12 col-sm-6 col-md-4">
            <div className="card bg-light p-2 pt-3 mb-3">
              <p className="fw-bold mb-0">{user.name} ({user.gender === "Female" ? "F" : user.gender === "Male" ? "M" : "O"})</p>
              <p className="fst-italic mb-0">{user.email}</p>
              <p className="mb-0">{user.birthdate}</p>
              <p>{user.address}</p>
              {/* <p className="mb-0 pb-0">Books Borrowed: {user.books.length}</p>
              <p className="mb-0 pb-1">Books Left: {8 - user.books.length}</p>
              <p className="mb-0 pb-0">Books Borrowed: {user.books.length === null ? `0` : user.books.length}</p>
              <p className="mb-0 pb-1">Books Left: {user.books.length === null ? `8` : 8 - user.books.length}</p> */}
              <div className="row px-2 py-0">
                {user.transactions.map((transaction) => {
                  const dueDate = new Date(transaction.dueDate).setHours(0, 0, 0, 0);
                  const isOverdue = dueDate < todayDate;
                  return <div key={transaction.transactionId} className="user-book col px-1" data-tooltip-id={`m-tooltip-${transaction.transactionId}`}>
                    <div className={`card ${transaction.isReturned ? "bg-light" : isOverdue ? "bg-danger text-white" : "bg-success text-white"} p-1 mb-2`} data-toggle="tooltip" data-placement="top">
                      <p className="fw-bold mb-0">{transaction.book.title}</p>
                      { getCardBodyData(dueDate, isOverdue) }
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
                <p className="mt-2">Member since: {dateFormatter(user.membershipDate)}</p>
                <i className="fa-solid fa-pen-to-square ms-auto" onClick={()=>{setSelectedUser(user);setIsUpdateMode(true)}} style={{ cursor: 'pointer' }}></i>
                <UserUpdateModal isUpdateMode={isUpdateMode} setIsUpdateMode={setIsUpdateMode} user={selectedUser}/>
            </div>
          </div>
        </div>
        })}
      </div>
    </div>
  </div>)
}

export default ManagePage;