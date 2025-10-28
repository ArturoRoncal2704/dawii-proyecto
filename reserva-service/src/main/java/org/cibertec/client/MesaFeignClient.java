package org.cibertec.client;

import org.cibertec.entity.Mesa;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "mesa-service")
public interface MesaFeignClient {
	
	@GetMapping("/api/mesas/{id}")
	Mesa obtenerMesaPorId(@PathVariable("id") Integer id);
	
	@PutMapping("/api/mesas/{id}")
    Mesa actualizarMesa(@PathVariable("id") Integer id, @RequestBody Mesa mesa);
	
	@GetMapping("/api/mesas/disponibles/count")
    Long contarMesasDisponibles();
}
