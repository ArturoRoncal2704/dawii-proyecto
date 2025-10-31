package org.cibertec.repository;

import java.util.List;

import org.cibertec.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
	List<Reserva> findByUsuario_IdUsuario(Integer idUsuario);

}
