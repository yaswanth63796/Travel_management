package com.example.Travel_management.Repository;

import com.example.Travel_management.Model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Bookrepo extends JpaRepository<Booking,Long> {
   List<Booking>findByuserid(Long userid);
}
