package com.example.Travel_management.Service;

import com.example.Travel_management.Model.Hotel;
import com.example.Travel_management.Repository.Hotelrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    @Autowired
    private Hotelrepo repo;


    public List<Hotel> getAllHotels() {
        return repo.findAll();
    }

    public Hotel addHotel(Hotel hotel) {
        return repo.save(hotel);
    }

    public Hotel updateHotel(Hotel hotel, Integer hotelId) {
        Hotel existing=repo.findById(hotelId).orElseThrow(()-> new RuntimeException("Specified Hotel not found"));
        existing.setHotelName(hotel.getHotelName());
        existing.setLocation(hotel.getLocation());
        existing.setDescription(hotel.getDescription());
        existing.setImageUrl(hotel.getImageUrl());
        existing.setTag(hotel.getTag());
        existing.setPricePerPerson(hotel.getPricePerPerson());
        existing.setContactNumber(hotel.getContactNumber());
        existing.setAvailable(hotel.getAvailable());
        repo.save(existing);
        return existing;
    }

    public void deleteHotel(Integer hotelId) {
        repo.deleteById(hotelId);
    }


    public List<Hotel> getHotelsByLocation(String location) {
        return repo.findByLocation(location);
    }
}
