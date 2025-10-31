package org.cibertec.repository;

import java.util.Optional;
import org.cibertec.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    
    Optional<Rol> findByNombre(String nombre);
}