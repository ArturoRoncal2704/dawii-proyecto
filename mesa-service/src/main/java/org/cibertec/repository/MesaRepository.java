package org.cibertec.repository;

import java.util.List;

import org.cibertec.entity.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;



public interface MesaRepository extends JpaRepository<Mesa, Integer> {
	
	List<Mesa> findByEstadoMesaIdEstMesa(Integer idEstMesa);
	
	long countByEstadoMesaIdEstMesa(Integer idEstMesa);


}
