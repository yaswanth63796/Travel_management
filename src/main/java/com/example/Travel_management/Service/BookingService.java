package com.example.Travel_management.Service;

import com.example.Travel_management.Model.Booking;
import com.example.Travel_management.Model.BookingStatus;
import com.example.Travel_management.Model.Tour;
import com.example.Travel_management.Repository.Bookrepo;
import com.example.Travel_management.Repository.Tourrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BookingService {

    @Autowired
    Tourrepo trepo;

    @Autowired
    Bookrepo brepo;
    public Booking addbook(int packageId, int userid, int noOfPersons) {

        Tour tour=trepo.findById(packageId).orElse(null);

        if(tour==null){
            throw new RuntimeException("No  Package has been Found");
        }
        if(tour.getAvailableseats()<noOfPersons){
            throw new RuntimeException("Seats Not Available");
        }

        int totalAmount=tour.getPrice()*noOfPersons;
        tour.setAvailableseats(
                tour.getAvailableseats()-noOfPersons
        );
        trepo.save(tour);

        Booking booking=new Booking();
        booking.setTour(tour);
        booking.setUserid((long) userid);
        booking.setNoOfPersons(noOfPersons);
        booking.setTotalamount(totalAmount);
        booking.setStatus(BookingStatus.CONFIRMED);
       return brepo.save(booking);
    }

    public List<Booking> getallbooks() {
       return brepo.findAll();
    }

    public List<Booking> getbookbyuser(Long userid) {
        return brepo.findByuserid(userid);
    }
}
