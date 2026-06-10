package com.example.Travel_management.Service;

import com.example.Travel_management.Model.User;
import com.example.Travel_management.Model.UserPrincipal;
import com.example.Travel_management.Repository.Userrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service

public class MyUserDetailsService implements UserDetailsService {


    @Autowired
    Userrepo repo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user=repo.findByemail(email);

        if(user==null){
            throw UsernameNotFoundException.fromUsername("User Not found");
        }

        return new UserPrincipal(user);

    }

}
