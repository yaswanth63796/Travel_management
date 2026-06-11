package com.example.Travel_management.Controller;

import com.example.Travel_management.Model.User;
import com.example.Travel_management.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.Travel_management.Repository.Userrepo;
import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService s;

    @Autowired
    Userrepo userRepo;

    @PostMapping("/api/public/register")
    public User adduser(@RequestBody User user) {
        return s.adduser(user);
    }

    @PostMapping("/api/public/login")
    public String loginuser(@RequestBody User user) {
        return s.login(user);
    }

    // Returns the current logged-in user's id and role from the DB using JWT
    @GetMapping("/api/user/me")
    public Map<String, Object> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepo.findByemail(userDetails.getUsername());
        Map<String, Object> result = new HashMap<>();
        result.put("id",    user.getId());
        result.put("role",  user.getRole());
        result.put("email", user.getEmail());
        result.put("name",  user.getName());
        return result;
    }
}

