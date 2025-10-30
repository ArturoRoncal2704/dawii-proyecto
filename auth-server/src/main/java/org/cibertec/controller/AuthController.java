package org.cibertec.controller;

import org.cibertec.dto.CustomUserDetails;
import org.cibertec.entity.Usuario;
import org.cibertec.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtEncoder jwtEncoder;

    @Autowired
    private UserRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String correo = credentials.get("correo");
            String contrasena = credentials.get("contrasena");

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(correo, contrasena)
            );

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            Instant now = Instant.now();
            long expiry = 3600L;

            JwtClaimsSet claims = JwtClaimsSet.builder()
                    .issuer("auth-server")
                    .issuedAt(now)
                    .expiresAt(now.plusSeconds(expiry))
                    .subject(userDetails.getUsername()) // correo del usuario
                    .claim("roles", authentication.getAuthorities().stream()
                            .map(a -> a.getAuthority())
                            .collect(Collectors.toList()))
                    .build();

            String token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

            Usuario usuario = usuarioRepository.findByCorreo(correo)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + correo));

            return ResponseEntity.ok(Map.of(
                    "access_token", token,
                    "token_type", "Bearer",
                    "expires_in", expiry,
                    "idUsuario", usuario.getIdUsuario(),
                    "nombre", usuario.getNombre(),
                    "rol", usuario.getRoles().stream()
                            .map(r -> r.getNombre())
                            .collect(Collectors.toList())
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(Map.of(
                    "error", "invalid_credentials",
                    "error_description", "Usuario o contraseña incorrectos"
            ));
        }
    }
}
