package org.cibertec.rabbit;

import org.cibertec.entity.Reserva;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MensajeReserva {

	@Autowired
	private RabbitTemplate rabbitTemplate;

	public void enviarReserva(Reserva reserva) {
		rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, reserva);
		System.out.println("Reserva enviada a RabbitMQ: " + reserva);
	}
}