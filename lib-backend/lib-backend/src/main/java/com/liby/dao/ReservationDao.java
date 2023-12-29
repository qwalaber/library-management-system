package com.liby.dao;

import com.liby.model.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ReservationDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ReservationDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Reservation mapRowToReservation(ResultSet rs, int rowNum) throws SQLException {
        Reservation reservation = new Reservation();
        reservation.setReservationId(rs.getInt("reservation_id"));
        reservation.setUserId(rs.getInt("user_id"));
        reservation.setBookId(rs.getInt("book_id"));
        reservation.setReservationDate(rs.getDate("reservation_date"));
        reservation.setExpiryDate(rs.getDate("expiry_date"));
        return reservation;
    }

    public List<Reservation> getAllReservations() {
        String sql = "SELECT * FROM reservations";
        return jdbcTemplate.query(sql, this::mapRowToReservation);
    }

    public Reservation getReservationById(int reservationId) {
        String sql = "SELECT * FROM reservations WHERE reservation_id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToReservation, reservationId);
    }

    public Reservation saveReservation(Reservation reservation) {
        String sql = "INSERT INTO reservations (user_id, book_id, reservation_date, expiry_date) " +
                "VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                reservation.getUserId(),
                reservation.getBookId(),
                reservation.getReservationDate(),
                reservation.getExpiryDate());
        return reservation;
    }

    public boolean doesReservationExist(int reservationId) {
        String sql = "SELECT COUNT(*) FROM reservation WHERE reservation_id = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, reservationId);
        return count > 0;
    }

    public Reservation updateReservation(int reservationId, Reservation updatedReservation) {
        if (doesReservationExist(reservationId)) {
            String sql = "UPDATE reservations SET user_id = ?, book_id = ?, reservation_date = ?, expiry_date = ? " +
                    "WHERE reservation_id = ?";
            jdbcTemplate.update(sql,
                    updatedReservation.getUserId(),
                    updatedReservation.getBookId(),
                    updatedReservation.getReservationDate(),
                    updatedReservation.getExpiryDate(),
                    reservationId);
            return updatedReservation;
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
            return null;
        }
    }

    public void deleteReservation(int reservationId) {
        if (doesReservationExist(reservationId)) {
            String sql = "DELETE FROM reservations WHERE reservation_id = ?";
            jdbcTemplate.update(sql, reservationId);
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found");
        }
    }
}
