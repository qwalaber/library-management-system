package com.liby.dao;

import com.liby.model.Book;
import com.liby.model.Transaction;
import com.liby.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class UserDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private User mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setUserId(rs.getInt("user_id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setGender(rs.getString("gender"));
        user.setAddress(rs.getString("address"));
        user.setBirthdate(rs.getDate("birthdate"));
        user.setBorrowsLeft(rs.getInt("borrows_left"));
        user.setMembershipDate(rs.getDate("membership_date"));

        return user;
    }

    public List<User> getAllUsersWithTransactions() {
        String sql = "SELECT u.user_id, u.name, u.email, u.password, u.gender, u.address, " +
                "u.birthdate, u.borrows_left, u.membership_date " +
                "FROM users u";
        List<User> users = jdbcTemplate.query(sql, this::mapRowToUser);
        for (User user : users) {
            List<Transaction> transactions = getTransactionsForUser(user.getUserId());
            user.setTransactions(transactions);
        }
        return users;
    }

    private List<Transaction> getTransactionsForUser(int userId) {
        String sql = "SELECT t.transaction_id, t.borrow_date, t.due_date, " +
                "t.return_date, t.is_returned, t.is_renewed, t.overdue_days, " +
                "b.book_id, b.title, b.author, b.genre, b.subject, b.language, " +
                "b.publication_date, b.image_name, b.is_available, " +
                "b.total_borrows, b.borrows_thirty_days " +
                "FROM transactions t " +
                "INNER JOIN books b ON t.book_id = b.book_id " +
                "WHERE t.user_id = ?";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Transaction transaction = new Transaction();
            Book book = new Book();
            book.setBookId(rs.getInt("book_id"));
            book.setTitle(rs.getString("title"));
            book.setAuthor(rs.getString("author"));
            book.setGenre(rs.getString("genre"));
            book.setSubject(rs.getString("subject"));
            book.setLanguage(rs.getString("language"));
            book.setPublicationDate(rs.getDate("publication_date"));
            book.setImageName(rs.getString("image_name"));
            book.setIsAvailable(rs.getBoolean("is_available"));
            book.setTotalBorrows(rs.getInt("total_borrows"));
            book.setBorrowsThirtyDays(rs.getInt("borrows_thirty_days"));

            transaction.setBook(book);
            transaction.setTransactionId(rs.getInt("transaction_id"));
            transaction.setBorrowDate(rs.getDate("borrow_date"));
            transaction.setDueDate(rs.getDate("due_date"));
            transaction.setReturnDate(rs.getDate("return_date"));
            transaction.setReturned(rs.getBoolean("is_returned"));
            transaction.setRenewed(rs.getBoolean("is_renewed"));
            transaction.setOverdueDays(rs.getInt("overdue_days"));
            return transaction;
        }, userId);
    }

    public User getUserById(int userId) {
        String sql = "SELECT * FROM users WHERE user_id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToUser, userId);
    }

    public User saveUser(User user) {
        String sql = "INSERT INTO users (name, email, password, gender, address, birthdate, borrows_left, membership_date) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getGender(),
                user.getAddress(),
                user.getBirthdate(),
                user.getBorrowsLeft(),
                user.getMembershipDate());
        return user;
    }

    public boolean doesUserExist(int userId) {
        String sql = "SELECT COUNT(*) FROM users WHERE user_id = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return count > 0;
    }

    public User updateUser(int userId, User updatedUser) {
        if (doesUserExist(userId)) {
            String sql = "UPDATE users SET name = ?, email = ?, password = ?, gender = ?, " +
                    "address = ?, birthdate = ?, borrows_left = ?, membership_date = ? " +
                    "WHERE user_id = ?";
            jdbcTemplate.update(sql,
                    updatedUser.getName(),
                    updatedUser.getEmail(),
                    updatedUser.getPassword(),
                    updatedUser.getGender(),
                    updatedUser.getAddress(),
                    updatedUser.getBirthdate(),
                    updatedUser.getBorrowsLeft(),
                    updatedUser.getMembershipDate(),
                    userId);
            return updatedUser;
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            return null;
        }
    }

    public void deleteUser(int userId) {
        if (doesUserExist(userId)) {
            String sql = "DELETE FROM users WHERE user_id = ?";
            jdbcTemplate.update(sql, userId);
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    public User findByEmail(String email) {
        try {
            String sql = "SELECT * FROM users WHERE email = ?";
            return jdbcTemplate.queryForObject(sql, this::mapRowToUser, email);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No User found with email: " + email + e);
            return null;
        }
    }
}