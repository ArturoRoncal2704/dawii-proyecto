package org.cibertec.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.cibertec.entity.Rol;
import org.cibertec.entity.Usuario;
import org.cibertec.repository.RolRepository;
import org.cibertec.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepo;
    
    @Autowired
    private RolRepository rolRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public List<Usuario> listarUsuarios() {
        return usuarioRepo.findAll();
    }

    public Usuario obtenerUsuarioPorId(Integer id) {
        return usuarioRepo.findById(id).orElse(null);
    }

    public Usuario obtenerUsuarioPorCorreo(String correo) {
        return usuarioRepo.findByCorreo(correo).orElse(null);
    }

    @Transactional
    public Map<String, Object> registrarUsuario(Usuario usuario) {
        if (existeCorreo(usuario.getCorreo())) {
            throw new IllegalArgumentException("Correo ya registrado");
        }
        
        usuario.setContrasena(encoder.encode(usuario.getContrasena()));
        
        if (usuario.getRoles() == null || usuario.getRoles().isEmpty()) {
            usuario.setRoles(Set.of(rolRepo.findByNombre("CLIENTE")
                .orElseThrow(() -> new RuntimeException("Rol CLIENTE no encontrado"))));
        }

        Usuario nuevo = usuarioRepo.save(usuario);
        return Map.of("mensaje", "Usuario registrado", "idUsuario", nuevo.getIdUsuario());
    }

    @Transactional
    public Usuario actualizarUsuario(Integer id, Usuario usuario) {
        Usuario existente = obtenerUsuarioPorId(id);
        if (existente == null) throw new IllegalArgumentException("Usuario no encontrado");
        
        usuario.setIdUsuario(id);
        usuario.setContrasena(usuario.getContrasena() != null && !usuario.getContrasena().isEmpty()
            ? encoder.encode(usuario.getContrasena())
            : existente.getContrasena());
        
        if (usuario.getRoles() == null || usuario.getRoles().isEmpty()) {
            usuario.setRoles(existente.getRoles());
        }
        
        return usuarioRepo.save(usuario);
    }

    @Transactional
    public void eliminarUsuario(Integer id) {
        if (!usuarioRepo.existsById(id)) {
            throw new IllegalArgumentException("Usuario no encontrado");
        }
        usuarioRepo.deleteById(id);
    }

    public boolean existeCorreo(String correo) {
        return usuarioRepo.existsByCorreo(correo);
    }

    public long contarUsuarios() {
        return usuarioRepo.count();
    }
}