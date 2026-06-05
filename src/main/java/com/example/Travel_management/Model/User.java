package com.example.Travel_management.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Users")
public class User {

    @Id
    private int id;
    private String name;
    private String email;
    private String gender;
    private String role;
    private String password;
}
