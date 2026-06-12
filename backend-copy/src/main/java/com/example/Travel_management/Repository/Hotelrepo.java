package com.example.Travel_management.Repository;

import com.example.Travel_management.Model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Hotelrepo extends JpaRepository<Hotel, Integer> {
    List<Hotel> findByLocation(String Location);
}
