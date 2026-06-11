package com.example.Travel_management.Service;


import com.example.Travel_management.Model.Tour;
import com.example.Travel_management.Repository.Tourrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TourService {
    @Autowired
       Tourrepo repo;

    public Tour addpackage(Tour tour) {
        tour.setPackage_id(null);
        return repo.save(tour);
    }

    public  Tour  updateepackage(int packageId, Tour updateTour) {
         Tour  existing=repo.findById(packageId).orElse(null);
         existing.setName(updateTour.getName());
         existing.setDestination(updateTour.getDestination());
         existing.setDescripiton(updateTour.getDescripiton());
         existing.setDurationdays(updateTour.getDurationdays());
         existing.setNoOfPersons(updateTour.getNoOfPersons());
         existing.setAvailableseats(updateTour.getAvailableseats());
         existing.setPrice(updateTour.getPrice());
         existing.setStartDate(updateTour.getStartDate());
         existing.setEndDate(updateTour.getEndDate());
         existing.setStatus(updateTour.getStatus());

         return repo.save(existing);


    }

    public List<Tour> getalllist() {

        return repo.findAll();
    }

    public void deletepackage(int packageId) {
        repo.deleteById(packageId);
    }
}