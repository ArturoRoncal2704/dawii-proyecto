package org.cibertec.repository;


import org.cibertec.entity.EstadoMesa;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IEstadoMesaRepository  extends JpaRepository<EstadoMesa, Integer> {
	
	
}
