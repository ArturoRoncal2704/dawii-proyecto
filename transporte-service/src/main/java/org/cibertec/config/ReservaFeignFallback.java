package org.cibertec.config;

import org.cibertec.client.ReservaFeignClient;
import org.cibertec.entity.Reserva;
import org.springframework.stereotype.Component;

@Component
public class ReservaFeignFallback implements ReservaFeignClient {

    @Override
    public Reserva obtenerReservaPorId(Integer id) {
        System.out.println("reserva-service no disponible para ID: " + id);
        Reserva reserva = new Reserva();
        reserva.setIdReserva(id);
        reserva.setNumeroPersonas(0);
        reserva.setFecha(null);
        reserva.setOrigen("fallback");
        return reserva;
    }
}