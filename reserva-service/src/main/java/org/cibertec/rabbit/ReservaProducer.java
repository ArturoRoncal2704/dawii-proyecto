package org.cibertec.rabbit;

import org.cibertec.entity.Reserva;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ReservaProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.exchange.name}")
    private String exchangeName;

    @Value("${app.routing.key}")
    private String routingKey;

    public ReservaProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void enviarReserva(Reserva mensaje) {
        rabbitTemplate.convertAndSend(exchangeName, routingKey, mensaje);
        System.out.println("📤 Enviado a RabbitMQ: " + mensaje);
    }
}
