package com.example.Travel_management.Repository;
import com.example.Travel_management.Model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Userrepo extends JpaRepository<User,Integer> {

    User findByemail(String email);
}
