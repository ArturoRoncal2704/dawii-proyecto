package org.cibertec.service;

import org.cibertec.dto.CustomUserDetails;
import org.cibertec.entity.Usuario;
import org.cibertec.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
    private UserRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	Usuario  usuario = usuarioRepository
        	.findByCorreo(username)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

     
    	if (usuario.getEnabled() == 0) {
            throw new DisabledException("Usuario deshabilitado");
        }

        return new CustomUserDetails(usuario);
    }
    
}
