package com.example.Travel_management.Controller;

import com.example.Travel_management.Model.User;

import com.example.Travel_management.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.Travel_management.Repository.Userrepo;
import java.util.Map;
import java.util.HashMap;

@RestController
public class UserController {
    @Autowired
    UserService s;

    @Autowired
    Userrepo userRepo;

    @PostMapping("/api/public/register")
    public User adduser(@RequestBody User user){

        return s.adduser(user);
    }

    @GetMapping("/api/user/me")
    public Map<String, Object> getCurrentUser(@AuthenticationPrincipal Object principal) {
        Map<String, Object> map = new HashMap<>();
        String email = null;
        
        if (principal instanceof OAuth2User oauth2User) {
            email = oauth2User.getAttribute("email");
        } else if (principal instanceof UserDetails userDetails) {
            email = userDetails.getUsername();
        }
        
        if (email != null) {
            map.put("email", email);
            User user = userRepo.findByemail(email);
            if (user != null) {
                map.put("id", user.getId());
                map.put("name", user.getName());
                map.put("role", user.getRole());
            } else {
                map.put("id", 1);
                map.put("name", "Google User");
                map.put("role", "USER");
            }
        }
        return map;
    }
}
