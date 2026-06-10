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
       return  repo.save(tour);
    }

    public  Tour  updateepackage(int packageId, Tour updatetour) {
         Tour  exisitng=repo.findById(packageId).orElse(null);

         updatetour.setName(exisitng.getName());
         updatetour.setDestination(exisitng.getDestination());
         updatetour.setDescripiton(exisitng.getDescripiton());
         updatetour.setDurationdays(exisitng.getDurationdays());
         updatetour.setNoOfPersons(exisitng.getNoOfPersons());
         updatetour.setAvailableseats(exisitng.getAvailableseats());
         updatetour.setPrice(exisitng.getPrice());
         updatetour.setStartDate(exisitng.getStartDate());
         updatetour.setEndDate(exisitng.getEndDate());
         updatetour.setStatus(exisitng.getStatus());

         return updatetour;


    }

    public List<Tour> getalllist() {

        return repo.findAll();
    }
}