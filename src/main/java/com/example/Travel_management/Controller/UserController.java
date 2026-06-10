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

    @GetMapping("/api/user/me")
    public Map<String, Object> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        Map<String, Object> map = new HashMap<>();

        if (userDetails != null) {
            String email = userDetails.getUsername();
            map.put("email", email);
            User user = userRepo.findByemail(email);
            if (user != null) {
                map.put("id", user.getId());
                map.put("name", user.getName());
                map.put("role", user.getRole());
            }
        }
        return map;
    }
}
