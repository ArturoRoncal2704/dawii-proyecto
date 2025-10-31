package org.cibertec.rabbit;

import org.cibertec.entity.Reserva;
import org.cibertec.entity.Transporte;
import org.cibertec.repository.TransporteRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TransporteListener {

    private final TransporteRepository transporteRepository;

    @Value("${app.queue.name}")
    private String queueName;

    public TransporteListener(TransporteRepository transporteRepository) {
        this.transporteRepository = transporteRepository;
    }

    @RabbitListener(queues = "${app.queue.name}")
    public void procesarTransporte(Reserva reserva) {
        System.out.println("Mensaje recibido en transporte-service: " + reserva.getIdReserva());

        Transporte transporte = new Transporte();
        transporte.setDireccion("Dirección por definir");
        transporte.setNumeroPasajeros(reserva.getNumeroPersonas());
        transporte.setReserva(reserva);

        transporteRepository.save(transporte);

        System.out.println("Transporte creado para la reserva ID: " + reserva.getIdReserva());
    }
}
