package org.cibertec.service;

import java.util.List;

import org.cibertec.client.MesaFeignClient;
import org.cibertec.entity.EstadoMesa;
import org.cibertec.entity.Mesa;
import org.cibertec.entity.Reserva;
import org.cibertec.rabbit.ReservaProducer;
import org.cibertec.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class ReservaService {
	
    @Autowired
    private ReservaRepository repo;
	
    @Autowired
    private MesaFeignClient mesaClient;
	
    @Autowired
    private ReservaProducer reservaProducer;
	
	
    public List<Reserva> listarReserva() {
        return repo.findAll();
    }
    
    
    public Reserva guardarReserva(Reserva reserva) {
        Mesa mesa = mesaClient.obtenerMesaPorId(reserva.getMesa().getIdMesa());
        
        if (mesa == null) {
            throw new RuntimeException("Mesa no encontrada");
        }
        
        if (!mesa.getEstadoMesa().getIdEstMesa().equals(1)) {
            throw new RuntimeException("La mesa no está disponible");
        }
        
        reserva.setMesa(mesa);
        Reserva nuevaReserva = repo.save(reserva);
        
        EstadoMesa ocupado = new EstadoMesa();
        ocupado.setIdEstMesa(2);
        mesa.setEstadoMesa(ocupado);
        mesaClient.actualizarMesa(mesa.getIdMesa(), mesa);
        
        reservaProducer.enviarReserva(nuevaReserva);
        System.out.println("Reserva enviada a RabbitMQ: " + nuevaReserva.getIdReserva());
        
        return nuevaReserva;
    }

    public Reserva obtenerReservaPorId(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminarReserva(Integer id) {
        repo.deleteById(id);
    }
    
    public long contarReservas() {
        return repo.count();
    }

    public void reenviarTodasLasReservas() {
        List<Reserva> reservas = repo.findAll();
        for (Reserva reserva : reservas) {
            reservaProducer.enviarReserva(reserva);
        }
        System.out.println("Todas las reservas reenviadas a RabbitMQ");
    }
}
