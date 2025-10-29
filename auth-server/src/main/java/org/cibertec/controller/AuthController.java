package org.cibertec.controller;

import org.cibertec.dto.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/oauth2")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtEncoder jwtEncoder;

    @PostMapping("/token")
    public ResponseEntity<?> login(@RequestParam String username,
                                    @RequestParam String password) {
        try {
            System.out.println("=== DEBUG LOGIN ===");
            System.out.println("Username recibido: " + username);
            System.out.println("Password recibido: " + password);
            
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );
            
            System.out.println("Autenticación exitosa!");
            System.out.println("Usuario autenticado: " + authentication.getName());
            System.out.println("Authorities: " + authentication.getAuthorities());

            Instant now = Instant.now();
            long expiry = 3600L;

            JwtClaimsSet.Builder claimsBuilder = JwtClaimsSet.builder()
                .issuer("http://localhost:8080")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(authentication.getName())
                .claim("scope", "api.read api.write")
                .claim("roles", authentication.getAuthorities().stream()
                    .map(a -> a.getAuthority())
                    .collect(Collectors.toList()));

            if (authentication.getPrincipal() instanceof CustomUserDetails userDetails) {
                claimsBuilder.claim("name", userDetails.getName());
                claimsBuilder.claim("email", userDetails.getEmail());
            }

            String token = jwtEncoder.encode(JwtEncoderParameters.from(claimsBuilder.build())).getTokenValue();

            return ResponseEntity.ok(Map.of(
                "access_token", token,
                "token_type", "Bearer",
                "expires_in", expiry
            ));

        } catch (Exception e) {
            System.err.println("=== ERROR EN LOGIN ===");
            e.printStackTrace();
            return ResponseEntity.status(401)
                .body(Map.of("error", "invalid_credentials", 
                            "error_description", "Usuario o contraseña incorrectos: " + e.getMessage()));
        }
    }
}