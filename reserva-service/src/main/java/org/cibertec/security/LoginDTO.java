package org.cibertec.security;


import lombok.Data;

@Data
public class LoginDTO {
    private String correo;
    private String contrasena;
}