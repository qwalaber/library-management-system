INSERT INTO Users (name, email, password, gender, address, birthdate)
VALUES
    ('Rahul Lim', 'rahul@example.com', 'pass123', 'Male', '123 Orchard Road, Singapore', '1990-05-15'),
    ('Leong Nair', 'leong@example.com', 'pass456', 'Male', '456 Jurong West Street, Singapore', '1988-08-22'),
    ('Arun Tan', 'arun@example.com', 'pass789', 'Male', '789 Serangoon Road, Singapore', '1995-03-10'),
    ('Liu Abdullah', 'liu@example.com', 'pass098', 'Male', '111 Bukit Timah Road, Singapore', '1992-11-18'),
    ('Nikhil Wong', 'nikhil@example.com', 'pass654', 'Male', '222 Sengkang East Avenue, Singapore', '1997-07-25'),
    ('Mei Devi', 'mei@example.com', 'pass321', 'Female', '333 Yishun Street, Singapore', '1987-09-30'),
    ('Ahmad Goh', 'ahmad@example.com', 'pass789', 'Male', '444 Clementi Avenue, Singapore', '1994-02-28'),
    ('Rajaratnam Chong', 'rajaratnam@example.com', 'pass456', 'Male', '555 Tampines Road, Singapore', '1991-06-05'),
    ('Kumar Abdullah', 'kumar@example.com', 'pass234', 'Male', '666 Bishan Road, Singapore', '1998-04-12'),
    ('Tanveer Ng', 'tanveer@example.com', 'pass567', 'Male', '777 Ang Mo Kio Avenue, Singapore', '1989-12-03'),
    ('Ravi Ho', 'ravi@example.com', 'pass890', 'Male', '888 Hougang Street, Singapore', '1996-01-20'),
    ('Liew Krishnan', 'liew@example.com', 'pass123', 'Male', '999 Woodlands Drive, Singapore', '1993-10-08'),
    ('Jayaraman Chua', 'jayaraman@example.com', 'pass456', 'Male', '101 Tiong Bahru Road, Singapore', '1999-08-17'),
    ('Rajesh Lim', 'rajesh@example.com', 'pass789', 'Male', '121 Pasir Ris Drive, Singapore', '1990-04-26'),
    ('Sanjeev Ang', 'sanjeev@example.com', 'pass234', 'Male', '131 Queenstown Road, Singapore', '1988-11-14'),
    ('Faridah Tan', 'faridah@example.com', 'pass567', 'Female', '141 Marine Parade Road, Singapore', '1995-06-07'),
    ('Lim Abdullah', 'lim@example.com', 'pass890', 'Male', '151 Simei Lane, Singapore', '1992-02-23'),
    ('Chandran Goh', 'chandran@example.com', 'pass123', 'Male', '161 Thomson Road, Singapore', '1987-09-12'),
    ('Nurul Chong', 'nurul@example.com', 'pass456', 'Female', '171 Pine St, Village, Singapore', '1994-07-01'),
    ('Siti Devi', 'siti@example.com', 'pass789', 'Female', '181 Cedar St, City, Singapore', '1991-03-19'),
    ('Yong Abdullah', 'yong@example.com', 'pass786', 'Male', '192 Little India, Singapore', '1990-09-05'),
    ('Singh Lim', 'singh@example.com', 'pass456', 'Male', '203 Serangoon Central, Singapore', '1993-12-12'),
    ('Lian Tan', 'lian@example.com', 'pass753', 'Female', '214 Arab Street, Singapore', '1996-08-29'),
    ('Aminah Goh', 'aminah@example.com', 'pass852', 'Female', '225 Bedok North Avenue, Singapore', '1998-06-17'),
    ('Karthik Chong', 'karthik@example.com', 'pass951', 'Male', '236 Boon Lay Avenue, Singapore', '1992-05-24');

INSERT INTO Librarians (name, email, password, gender, address, birthdate, hire_date)
VALUES
	('Admin', 'admin@liby.com', 'pass123', 'Other', 'Nil', '1998-02-06', '2023-12-14'),
    ('Seow Abdullah', 'seow@example.com', 'pass890', 'Male', '151 Simei Lane, Singapore', '1992-02-23', '2022-01-15'),
    ('Ahmed Goh', 'ahmed@example.com', 'pass123', 'Male', '161 Thomson Road, Singapore', '1987-09-12', '2022-03-05'),
    ('Xin Chong', 'xin@example.com', 'pass456', 'Female', '171 Pine St, Village, Singapore', '1994-07-01', '2021-08-29'),
    ('Nasreen Devi', 'nasreen@example.com', 'pass789', 'Female', '181 Cedar St, City, Singapore', '1991-03-19', '2022-02-12');

INSERT INTO Books (title, author, genre, subject, language, publication_date, image_name)
VALUES
    ('The Lost Symbol', 'Dan Brown', 'Fiction', 'Thriller', 'English', '2009-09-15', 'book1'),
    ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 'Literature', 'English', '1960-07-11', 'book2'),
    ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'Non-fiction', 'History', 'English', '2011-02-10', 'book3'),
    ('The Da Vinci Code', 'Dan Brown', 'Fiction', 'Mystery', 'English', '2003-03-18', 'book4'),
    ('Atomic Habits', 'James Clear', 'Non-fiction', 'Self-help', 'English', '2018-10-16', 'book5'),
    ('1984', 'George Orwell', 'Fiction', 'Horror', 'English', '1949-06-08', 'book6'),
    ('The Alchemist', 'Paulo Coelho', 'Fiction', 'Thriller', 'English', '1988-01-01', 'book7'),
    ('The Power of Habit', 'Charles Duhigg', 'Non-fiction', 'Psychology', 'English', '2012-02-28', 'book8'),
    ('Thinking, Fast and Slow', 'Daniel Kahneman', 'Non-fiction', 'Philosophy', 'English', '2011-10-25', 'book9'),
    ('The Art of War', 'Sun Tzu', 'Non-fiction', 'Psychology', 'English', '2005-01-01', 'book10'),
    ('The Silent Patient', 'Alex Michaelides', 'Fiction', 'Mystery', 'English', '2019-02-05', 'book1'),
    ('Educated', 'Tara Westover', 'Non-fiction', 'History', 'English', '2018-02-20', 'book2'),
    ('The Girl on the Train', 'Paula Hawkins', 'Fiction', 'Thriller', 'English', '2015-01-13', 'book3'),
    ('The Subtle Art of Not Giving a F*ck', 'Mark Manson', 'Non-fiction', 'Self-help', 'English', '2016-09-13', 'book4'),
    ('Born a Crime', 'Trevor Noah', 'Non-fiction', 'History', 'English', '2016-11-15', 'book5'),
    ('Gone Girl', 'Gillian Flynn', 'Fiction', 'Thriller', 'English', '2012-06-05', 'book6'),
    ('The Immortal Life of Henrietta Lacks', 'Rebecca Skloot', 'Non-fiction', 'Science', 'English', '2010-02-02', 'book7'),
    ('The Night Circus', 'Erin Morgenstern', 'Fiction', 'Fantasy', 'English', '2011-09-13', 'book8'),
    ('The Martian', 'Andy Weir', 'Fiction', 'Romance', 'English', '2014-02-11', 'book9'),
    ('Educated', 'Tara Westover', 'Non-fiction', 'History', 'English', '2018-02-20', 'book10'),
    ('கதைகள்', 'சுஜாதா', 'Fiction', 'Literature', 'Tamil', '2020-05-15', 'book1'),
    ('கார்போன் திரிகள்', 'டான் பிளேணற்றுகள்', 'Fiction', 'Thriller', 'Tamil', '2018-10-21', 'book2'),
    ('黄色信封', '卫梦达', 'Fiction', 'Mystery', 'Chinese', '2015-07-18', 'book3'),
    ('奇迹', '史蒂文·尤因', 'Fiction', 'Self-help', 'Chinese', '2008-12-30', 'book4'),
    ('Pantun Pembuka Pintu', 'Rosli Tapa', 'Fiction', 'Poetry', 'Malay', '2003-06-09', 'book5'),
    ('Hikayat Seribu Satu Malam', 'Abdul Halim Nasir', 'Non-Fiction', 'History', 'Malay', '1999-11-25', 'book6'),
    ('இளம் பூவின் சிற்பம்', 'ஜெயலக்ஷ்மி வெங்கடராஜ்', 'Fiction', 'Romance', 'Tamil', '2012-04-05', 'book7'),
    ('八百壮士', '雪华红武', 'Non-Fiction', 'History', 'Chinese', '2010-09-14', 'book8'),
    ('Cerita Rakyat Malaysia', 'Munirah Abdul Karim', 'Non-Fiction', 'History', 'Malay', '2007-11-02', 'book9'),
    ('வண்ணம் முழுக்க', 'மாதுலீ முகம்', 'Fiction', 'Mystery', 'Tamil', '2016-08-19', 'book10');

INSERT INTO Transactions (user_id, book_id, librarian_id, borrow_date)
VALUES
    (1, 5, 1, '2023-10-10'),
    (3, 9, 1, '2023-09-15'),
    (7, 1, 1, '2023-08-25'),
    (2, 11, 1, '2023-07-14'),
    (5, 3, 1, '2023-06-21'),
    (4, 8, 1, '2023-05-30'),
    (10, 12, 1, '2023-04-19'),
    (8, 15, 1, '2023-03-27'),
    (6, 19, 1, '2023-02-10'),
    (9, 20, 1, '2023-01-05'),
    (11, 7, 1, '2022-12-12'),
    (13, 17, 1, '2022-11-20'),
    (15, 2, 1, '2022-10-18'),
    (17, 10, 1, '2022-09-26'),
    (19, 4, 1, '2022-08-05'),
    (12, 14, 1, '2022-07-11'),
    (14, 16, 1, '2022-06-29'),
    (16, 18, 1, '2022-05-15'),
    (18, 6, 1, '2022-04-20'),
    (20, 13, 1, '2022-03-08');

INSERT INTO Reservations (user_id, book_id, reservation_date)
VALUES
    (1, 5, '2023-11-01'), 
    (3, 9, '2023-11-05'), 
    (5, 3, '2023-11-10'); 