DROP DATABASE IF EXISTS library_management_system;
CREATE DATABASE library_management_system;
USE library_management_system;

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    address VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    borrows_left INT NOT NULL DEFAULT 8,
    membership_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Librarians (
    librarian_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    address VARCHAR(255),
    birthdate DATE NOT NULL,
    hire_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre ENUM('Fiction', 'Non-fiction') NOT NULL,
    subject ENUM('Literature', 'Science', 'History', 'Art', 'Technology', 'Mathematics', 'Philosophy', 'Psychology', 'Business', 'Health', 'Self-help', 'Poetry', 'Thriller', 'Romance', 'Horror', 'Mystery', 'Fantasy') NOT NULL,
    language ENUM('English','Tamil','Malay','Chinese','Others') NOT NULL,
    publication_date DATE NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    availability BOOLEAN NOT NULL DEFAULT TRUE,
    total_borrows INT NOT NULL DEFAULT 0,
    borrows_thirty_days INT NOT NULL DEFAULT 0
);

CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    borrow_date DATE NOT NULL,
    due_date DATE AS (DATE_ADD(borrow_date, INTERVAL 14 DAY)) NOT NULL,
    return_date DATE DEFAULT NULL,
    renewal BOOLEAN NOT NULL DEFAULT FALSE,
    librarian_id INT NOT NULL,
    return_librarian_id INT DEFAULT NULL,
    CONSTRAINT fk_user_id_transactions FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT fk_book_id_transactions FOREIGN KEY (book_id) REFERENCES Books(book_id),
    CONSTRAINT fk_librarian_id_transactions FOREIGN KEY (librarian_id) REFERENCES librarians(librarian_id),
    CONSTRAINT fk_return_librarian_id_transactions FOREIGN KEY (return_librarian_id) REFERENCES librarians(librarian_id)
);

CREATE TABLE Reservations (
    reservationId INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    expiryDate DATE AS (DATE_ADD(reservation_date, INTERVAL 5 DAY)) NOT NULL,
    CONSTRAINT fk_user_id_reservations FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT fk_book_id_reservations FOREIGN KEY (book_id) REFERENCES Books(book_id)
);