package com.example.Travel_management.Service;
import  com.example.Travel_management.Model.User;


import com.example.Travel_management.Repository.Userrepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    @Autowired
    AuthenticationManager authmanager;
    @Autowired
    Userrepo repo;


    @Autowired
    JwtService jwts;

    public User adduser(User user) {

        BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder(12);
          user.setPassword(passwordEncoder.encode(user.getPassword()));
          repo.save(user);
          return user;
    }

    public String login(User user) {
        Authentication authentication=authmanager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

        if(authentication.isAuthenticated()){

            return jwts.generatetoken(user.getEmail());
        }
        else{
            return "fail";
        }
    }
}
