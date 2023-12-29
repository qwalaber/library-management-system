package com.liby.dao;

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
        user.setCreatedAt(rs.getDate("created_at"));
        return user;
    }

    public List<User> getAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, this::mapRowToUser);
    }

    public List<User> getAllUsersWithTransactions() {
        String sql = "SELECT u.user_id, u.name, u.email, u.password, u.gender, u.address, " +
                "u.birthdate, u.borrows_left, u.created_at, t.transaction_id, t.book_id, " +
                "t.borrow_date, t.due_date, t.return_date, t.is_returned, t.is_renewed, t.overdue_days " +
                "FROM users u " +
                "LEFT JOIN transactions t ON u.user_id = t.user_id";

        Map<Integer, User> userMap = new HashMap<>(); // Map to hold users and their transactions

        jdbcTemplate.query(sql, (rs) -> {
            int userId = rs.getInt("user_id");

            User user = userMap.get(userId);
            if (user == null) {
                user = new User();
                user.setUserId(userId);
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                user.setPassword(rs.getString("password"));
                user.setGender(rs.getString("gender"));
                user.setAddress(rs.getString("address"));
                user.setBirthdate(rs.getDate("birthdate"));
                user.setBorrowsLeft(rs.getInt("borrows_left"));
                user.setCreatedAt(rs.getDate("created_at"));
                user.setTransactions(new ArrayList<>());
            }

            Transaction transaction = new Transaction();
            transaction.setTransactionId(rs.getInt("transaction_id"));
            transaction.setBookId(rs.getInt("book_id"));
            transaction.setBorrowDate(rs.getDate("borrow_date"));
            transaction.setDueDate(rs.getDate("due_date"));
            transaction.setReturnDate(rs.getDate("return_date"));
            transaction.setReturned(rs.getBoolean("is_returned"));
            transaction.setRenewed(rs.getBoolean("is_renewed"));
            transaction.setOverdueDays(rs.getInt("overdue_days"));

            user.getTransactions().add(transaction);

            userMap.put(userId, user);

            return null;
        });

        return new ArrayList<>(userMap.values());
    }


    public User getUserById(int userId) {
        String sql = "SELECT * FROM users WHERE user_id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToUser, userId);
    }

    public User saveUser(User user) {
        String sql = "INSERT INTO users (name, email, password, gender, address, birthdate, borrows_left, created_at) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getGender(),
                user.getAddress(),
                user.getBirthdate(),
                user.getBorrowsLeft(),
                user.getCreatedAt());
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
                    "address = ?, birthdate = ?, borrows_left = ?, created_at = ? " +
                    "WHERE user_id = ?";
            jdbcTemplate.update(sql,
                    updatedUser.getName(),
                    updatedUser.getEmail(),
                    updatedUser.getPassword(),
                    updatedUser.getGender(),
                    updatedUser.getAddress(),
                    updatedUser.getBirthdate(),
                    updatedUser.getBorrowsLeft(),
                    updatedUser.getCreatedAt(),
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