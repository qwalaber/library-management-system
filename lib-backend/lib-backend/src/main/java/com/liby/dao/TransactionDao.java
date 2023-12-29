package com.liby.dao;

import com.liby.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class TransactionDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TransactionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Transaction mapRowToTransaction(ResultSet rs, int rowNum) throws SQLException {
        Transaction transaction = new Transaction();
        transaction.setTransactionId(rs.getInt("transaction_id"));
        transaction.setUserId(rs.getInt("user_id"));
        transaction.setBookId(rs.getInt("book_id"));
        transaction.setBorrowDate(rs.getDate("borrow_date"));
        transaction.setDueDate(rs.getDate("due_date"));
        transaction.setReturnDate(rs.getDate("return_date"));
        transaction.setReturned(rs.getBoolean("is_returned"));
        transaction.setRenewed(rs.getBoolean("is_renewed"));
        transaction.setOverdueDays(rs.getInt("overdue_days"));
        return transaction;
    }

    public List<Transaction> getAllTransactions() {
        String sql = "SELECT * FROM transactions";
        return jdbcTemplate.query(sql, this::mapRowToTransaction);
    }

    public Transaction getTransactionById(int transactionId) {
        String sql = "SELECT * FROM transactions WHERE transaction_id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToTransaction, transactionId);
    }

    public Transaction saveTransaction(Transaction transaction) {
        String sql = "INSERT INTO transaction (user_id, book_id, borrow_date, due_date, return_date, is_returned, is_renewed, overdue_days) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                transaction.getUserId(),
                transaction.getBookId(),
                transaction.getBorrowDate(),
                transaction.getDueDate(),
                transaction.getReturnDate(),
                transaction.getReturned(),
                transaction.getRenewed(),
                transaction.getOverdueDays());
        return transaction;
    }

    public boolean doesTransactionExist(int transactionId) {
        String sql = "SELECT COUNT(*) FROM transactions WHERE transaction_id = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, transactionId);
        return count > 0;
    }

    public Transaction updateTransaction(int transactionId, Transaction updatedTransaction) {
        if (doesTransactionExist(transactionId)) {
            String sql = "UPDATE transactions SET user_id = ?, book_id = ?, borrow_date = ?, due_date = ?, " +
                    "return_date = ?, is_returned = ?, is_renewed = ?, overdue_days = ? " +
                    "WHERE transaction_id = ?";
            jdbcTemplate.update(sql,
                    updatedTransaction.getUserId(),
                    updatedTransaction.getBookId(),
                    updatedTransaction.getBorrowDate(),
                    updatedTransaction.getDueDate(),
                    updatedTransaction.getReturnDate(),
                    updatedTransaction.getReturned(),
                    updatedTransaction.getRenewed(),
                    updatedTransaction.getOverdueDays(),
                    transactionId);
            return updatedTransaction;
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction not found");
            return null;
        }
    }

    public void deleteTransaction(int transactionId) {
        if (doesTransactionExist(transactionId)) {
            String sql = "DELETE FROM transactions WHERE transaction_id = ?";
            jdbcTemplate.update(sql, transactionId);
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction not found");
        }
    }
}
