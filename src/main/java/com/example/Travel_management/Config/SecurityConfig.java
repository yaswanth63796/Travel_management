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
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

    @Autowired
    UserDetailsService service;



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, ClientRegistrationRepository clientRegistrationRepository) throws Exception {
         http.csrf(Customizer->Customizer.disable());
         http.httpBasic(basic -> basic.authenticationEntryPoint((request, response, authException) -> {
             response.setStatus(jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED);
             response.setContentType("application/json");
             response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"" + authException.getMessage() + "\"}");
         }));
         http.authorizeHttpRequests(request->request.requestMatchers("/api/admin/**").hasRole("ADMIN"));
         http.authorizeHttpRequests(request->request.requestMatchers("/api/user/**").authenticated());
         http.authorizeHttpRequests(request->request.requestMatchers("/api/public/**", "/error").permitAll());
         http.authorizeHttpRequests(request->request.anyRequest().authenticated());
         http.oauth2Login(oauth2 -> oauth2
             .authorizationEndpoint(authorization -> authorization
                 .authorizationRequestResolver(new CustomOAuth2AuthorizationRequestResolver(clientRegistrationRepository))
             )
             .defaultSuccessUrl("http://localhost:5173/", true)
         );
         http.logout(logout -> logout
             .logoutUrl("/api/logout")
             .logoutSuccessHandler((request, response, authentication) -> {
                 response.setStatus(jakarta.servlet.http.HttpServletResponse.SC_OK);
             })
         );

         return http.build();
    }


    @Bean
     public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider(service);
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));

        return provider;
     }

    private static class CustomOAuth2AuthorizationRequestResolver implements OAuth2AuthorizationRequestResolver {
        private final OAuth2AuthorizationRequestResolver defaultResolver;

        public CustomOAuth2AuthorizationRequestResolver(ClientRegistrationRepository clientRegistrationRepository) {
            this.defaultResolver = new DefaultOAuth2AuthorizationRequestResolver(
                    clientRegistrationRepository, "/oauth2/authorization");
        }

        @Override
        public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
            OAuth2AuthorizationRequest authorizationRequest = this.defaultResolver.resolve(request);
            return authorizationRequest != null ? customAuthorizationRequest(request, authorizationRequest) : null;
        }

        @Override
        public OAuth2AuthorizationRequest resolve(HttpServletRequest request, String clientRegistrationId) {
            OAuth2AuthorizationRequest authorizationRequest = this.defaultResolver.resolve(request, clientRegistrationId);
            return authorizationRequest != null ? customAuthorizationRequest(request, authorizationRequest) : null;
        }

        private OAuth2AuthorizationRequest customAuthorizationRequest(
                HttpServletRequest request, OAuth2AuthorizationRequest authorizationRequest) {
            String loginHint = request.getParameter("login_hint");
            if (loginHint != null) {
                Map<String, Object> additionalParameters = new HashMap<>(authorizationRequest.getAdditionalParameters());
                additionalParameters.put("login_hint", loginHint);
                
                String uri = authorizationRequest.getAuthorizationRequestUri();
                if (uri != null) {
                    try {
                        if (uri.contains("?")) {
                            uri += "&login_hint=" + org.springframework.web.util.UriUtils.encode(loginHint, "UTF-8");
                        } else {
                            uri += "?login_hint=" + org.springframework.web.util.UriUtils.encode(loginHint, "UTF-8");
                        }
                    } catch (Exception e) {
                        // fallback to original uri
                    }
                }
                
                System.out.println("CustomOAuth2RequestResolver -> generated uri: " + uri);
                
                return OAuth2AuthorizationRequest.from(authorizationRequest)
                        .additionalParameters(additionalParameters)
                        .authorizationRequestUri(uri)
                        .build();
            }
            return authorizationRequest;
        }
    }
}

