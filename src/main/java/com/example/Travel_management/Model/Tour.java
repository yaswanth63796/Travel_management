package com.example.Travel_management.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Package_details")
public class Tour {


     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Integer package_id;
     private  String name;
     private String destination;
     private String descripiton;
     private int durationdays;
     private int noOfPersons;
     private int availableseats;
     private int price;
     private LocalDate startDate;
     private LocalDate endDate;
     private String status;



}
