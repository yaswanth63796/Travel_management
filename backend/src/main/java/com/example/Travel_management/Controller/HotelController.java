package com.example.Travel_management.Controller;

import com.example.Travel_management.Model.Hotel;
import com.example.Travel_management.Service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HotelController {
    @Autowired
    private HotelService hotelservice;

    @GetMapping("/api/admin/hotels")
    public List<Hotel> getAllHotels()
    {
        return hotelservice.getAllHotels();
    }

    @PostMapping("/api/admin/hotels/add")
    public Hotel addHotel(@RequestBody Hotel hotel)
    {
        return hotelservice.addHotel(hotel);
    }

    @PutMapping("/api/admin/hotels/{hotelId}")
    public Hotel updateHotel(@RequestBody Hotel hotel, @PathVariable Integer hotelId)
    {
        return hotelservice.updateHotel(hotel,hotelId);
    }

    @DeleteMapping("/api/admin/hotels/{hotelId}")
    public String deleteHotel(@PathVariable Integer hotelId)
    {
        hotelservice.deleteHotel(hotelId);
        return "Hotel Deleted";
    }

    @GetMapping("/api/user/hotels")
    public List<Hotel> getHotelsByLocation(@RequestParam String location)
    {
        return hotelservice.getHotelsByLocation(location);
    }

}
