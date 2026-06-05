package com.example.Travel_management.Controller;

import com.example.Travel_management.Model.User;

import com.example.Travel_management.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserService s;

    @PostMapping("/api/public/register")
    public User adduser(@RequestBody User user){

        return s.adduser(user);
    }
}
