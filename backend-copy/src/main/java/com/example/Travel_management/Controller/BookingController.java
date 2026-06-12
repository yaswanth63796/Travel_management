package com.example.Travel_management.Controller;


import com.example.Travel_management.Model.Booking;
import com.example.Travel_management.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    BookingService s;

    @PostMapping("/api/user/add/{package_id}")
    public Booking addbook(@PathVariable int package_id, @RequestParam int userid, @RequestParam int noOfPersons, @RequestParam(required = false) Integer hotelId) {
        return s.addbook(package_id, userid, noOfPersons, hotelId);
    }

    @GetMapping("/api/admin/getbooks")
    public List<Booking> getallbooking() {
        return s.getallbooks();
    }

    @GetMapping("/api/user/getbooks/{userid}")
    public List<Booking> getbookbyuser(@PathVariable Long userid) {
        return s.getbookbyuser(userid);
    }
}
