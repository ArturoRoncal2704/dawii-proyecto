package org.cibertec.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    @Order(1)
    public SecurityFilterChain authEndpoints(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/auth/**")
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/login").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(login -> login.disable())
            .httpBasic(basic -> basic.disable());
        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain defaultSecurity(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .formLogin(login -> login.disable())
            .httpBasic(basic -> basic.disable());
        return http.build();
    }
    
    
}