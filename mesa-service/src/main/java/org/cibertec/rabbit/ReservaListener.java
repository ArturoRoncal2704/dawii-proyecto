package org.cibertec.rabbit;

import org.cibertec.entity.EstadoMesa;
import org.cibertec.entity.Mesa;
import org.cibertec.entity.Reserva;
import org.cibertec.repository.EstadoMesaRepository;
import org.cibertec.repository.MesaRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ReservaListener {

    private final MesaRepository mesaRepository;
    private final EstadoMesaRepository estadoMesaRepository;

    @Value("${app.queue.name}")
    private String queueName;

    public ReservaListener(MesaRepository mesaRepository, EstadoMesaRepository estadoMesaRepository) {
        this.mesaRepository = mesaRepository;
        this.estadoMesaRepository = estadoMesaRepository;
    }

    @RabbitListener(queues = "${app.queue.name}")
    public void recibirReserva(Reserva reserva) {
        System.out.println("Reserva recibida desde RabbitMQ: " + reserva.getIdReserva());

        Mesa mesa = reserva.getMesa();
        if (mesa == null) {
            System.out.println("La reserva no tiene mesa asignada.");
            return;
        }

        Mesa mesaDB = mesaRepository.findById(mesa.getIdMesa()).orElse(null);
        if (mesaDB == null) {
            System.out.println("No se encontró la mesa con ID " + mesa.getIdMesa());
            return;
        }

        EstadoMesa estadoOcupado = estadoMesaRepository.findById(2)
                .orElseThrow(() -> new RuntimeException("Estado 'Ocupada' no encontrado"));

        mesaDB.setEstadoMesa(estadoOcupado);
        mesaRepository.save(mesaDB);

        System.out.println("Mesa " + mesaDB.getNumero() + " actualizada a estado 'Ocupada'");
    }
}
