package org.cibertec.client;

import org.cibertec.config.FeignClientConfig;
import org.cibertec.entity.Reserva;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "reserva-service" , configuration = FeignClientConfig.class)
public interface ReservaFeignClient {
    
    @GetMapping("/api/reservas/{id}")
    Reserva obtenerReservaPorId(@PathVariable("id") Integer id);
}