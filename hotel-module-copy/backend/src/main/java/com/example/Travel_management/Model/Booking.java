package com.example.Travel_management.Model;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    private Long userid;
    private int noOfPersons;
    private int totalamount;
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @ManyToOne
    @JoinColumn(name="package_id")
    private Tour  tour;

    @ManyToOne
    @JoinColumn(name="hotelId",nullable=true)
    private Hotel hotel;


}
