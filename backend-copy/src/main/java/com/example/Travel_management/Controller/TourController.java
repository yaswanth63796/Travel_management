package com.example.Travel_management.Controller;


import com.example.Travel_management.Model.Tour;
import com.example.Travel_management.Service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@CrossOrigin(origins = "*")
public class TourController {


    @Autowired
    TourService s;


    @PostMapping("/api/admin/add")
     public Tour addpackage(@RequestBody  Tour tour){
         s.addpackage(tour);
         return tour;


     }
     @PutMapping("/api/admin/update/{package_id}")
      public Tour updatepackage(@PathVariable int package_id,@RequestBody Tour tour){
         return s.updateepackage(package_id,tour);
     }

     @GetMapping("/api/user/get")
     public List<Tour> getalllist(){

        return s.getalllist();
     }

     /*
     @GetMapping("/api/admin/hello")
     public String hello(){
        return "it is adminpage";
     }


     @GetMapping("api/user/hi")
     public String hi(){
        return "it is userpage";
     }
     */

}
