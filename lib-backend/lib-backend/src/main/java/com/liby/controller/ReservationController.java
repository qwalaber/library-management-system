package com.liby.controller;

import com.liby.dao.ReservationDao;
import com.liby.model.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationDao reservationDao;

    @GetMapping
    public List<Reservation> getAllReservations() {
        try {
            return reservationDao.getAllReservations();
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get all reservations");
            return null;
        }
    }

    @GetMapping("/{id}")
    public Reservation getReservation(@PathVariable int id) {
        try {
            return reservationDao.getReservationById(id);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get reservation by id");
            return null;
        }
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        try {
            return reservationDao.saveReservation(reservation);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save new reservation");
            return null;
        }
    }

    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable int id, @RequestBody Reservation updatedReservation) {
        try {
            return reservationDao.updateReservation(id, updatedReservation);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update reservation");
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable int id) {
        try {
            reservationDao.deleteReservation(id);
            return ResponseEntity.ok("Reservation deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Reservation deletion failed");
            return null;
        }
    }
}
