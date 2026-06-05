package com.example.Travel_management.Service;
import  com.example.Travel_management.Model.User;


import com.example.Travel_management.Repository.Userrepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    Userrepo repo;

    public User adduser(User user) {

        BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder(12);
          user.setPassword(passwordEncoder.encode(user.getPassword()));
          repo.save(user);
          return user;
    }
}
