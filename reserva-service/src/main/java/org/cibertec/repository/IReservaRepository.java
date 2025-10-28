package org.cibertec.repository;

import org.cibertec.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IReservaRepository extends JpaRepository<Reserva, Integer> {

}
