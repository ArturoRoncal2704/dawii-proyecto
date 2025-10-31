package org.cibertec.config;

import org.cibertec.client.MesaFeignClient;
import org.cibertec.entity.EstadoMesa;
import org.cibertec.entity.Mesa;
import org.springframework.stereotype.Component;


@Component
public class MesaFeignFallback implements MesaFeignClient {
    
    @Override
    public Mesa obtenerMesaPorId(Integer id) {
        System.out.println("Servicio de mesa no disponible para obtener mesa por ID: " + id);

        Mesa mesa = new Mesa();
        mesa.setIdMesa(id);
        mesa.setCapacidad(0);

        EstadoMesa estado = new EstadoMesa();
        estado.setIdEstMesa(0);
        estado.setDescripcion("NO DISPONIBLE");

        mesa.setEstadoMesa(estado);

        return mesa;
    }

    @Override
    public Mesa actualizarMesa(Integer id, Mesa mesa) {
        System.out.println("Servicio de mesa no disponible para actualizar mesa con ID: " + id);
        return mesa;
    }

    @Override
    public Long contarMesasDisponibles() {
        System.out.println("Servicio de mesa no disponible para contar mesas disponibles.");
        return 0L;
    }
}
