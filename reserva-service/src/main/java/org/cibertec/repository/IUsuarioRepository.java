package org.cibertec.repository;

import java.util.Optional;

import org.cibertec.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IUsuarioRepository extends JpaRepository<Usuario, Integer> {
	
	Optional<Usuario> findByCorreo(String correo);
	
	boolean existsByCorreo(String correo);

}
