package com.example.Travel_management.Config;


import com.example.Travel_management.Model.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

    @Autowired
    UserDetailsService service;



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http){
         http.csrf(Customizer->Customizer.disable());
         http.httpBasic(Customizer.withDefaults());
         http.authorizeHttpRequests(request->request.requestMatchers("/api/admin/**").hasRole("ADMIN"));
         http.authorizeHttpRequests(request->request.requestMatchers("/api/user/**").authenticated());
         http.authorizeHttpRequests(request->request.requestMatchers("/api/public/**").permitAll());
         http.authorizeHttpRequests(request->request.anyRequest().authenticated());
         http.oauth2Login(Customizer.withDefaults());

         return http.build();
    }


    @Bean
     public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider(service);
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));

        return provider;
     }
}
