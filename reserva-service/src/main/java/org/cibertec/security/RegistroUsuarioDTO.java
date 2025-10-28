package org.cibertec.security;

import lombok.Data;

@Data
public class RegistroUsuarioDTO {

    private String nombre;
    private String correo;
    private String contrasena;
    private String telefono;
}