package com.example.Travel_management.Controller;

import com.example.Travel_management.Config.JwtService;
import com.example.Travel_management.Model.User;
import com.example.Travel_management.Repository.Userrepo;
import com.example.Travel_management.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    UserService s;

    @Autowired
    Userrepo userRepo;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/api/public/register")
    public User adduser(@RequestBody User user) {
        return s.adduser(user);
    }

    @PostMapping("/api/public/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        if (auth.isAuthenticated()) {
            User user = userRepo.findByemail(email);
            String token = jwtService.generateToken(email, user.getRole());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("name", user.getName());
            response.put("role", user.getRole());
            return response;
        }

        throw new RuntimeException("Invalid credentials");
    }

    @GetMapping("/api/user/me")
    public Map<String, Object> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);
        User user = userRepo.findByemail(email);

        Map<String, Object> map = new HashMap<>();
        map.put("email", user.getEmail());
        map.put("id", user.getId());
        map.put("name", user.getName());
        map.put("role", user.getRole());
        return map;
    }
}
