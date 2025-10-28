package org.cibertec.dto;

import java.util.List;
import java.util.stream.Collectors;


import org.cibertec.entity.Usuario;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUserDetails extends User {

    private static final long serialVersionUID = 193184576142281751L;

    private final String name;
    private final String email;


    public CustomUserDetails(Usuario user) {
        super(user.getCorreo(),
            user.getContrasena(),
            user.getRoles().stream()
                .map(rol -> new SimpleGrantedAuthority("ROLE_" + rol.getNombre()))
                .collect(Collectors.toList())
        );

        this.name = user.getNombre();
        this.email = user.getCorreo();
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}