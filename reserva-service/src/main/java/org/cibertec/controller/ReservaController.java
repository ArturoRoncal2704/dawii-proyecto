package org.cibertec.controller;

import java.util.List;
import java.util.Map;

import org.cibertec.entity.Reserva;
import org.cibertec.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/reserva")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<?> listarReservas() {
        List<Reserva> reservas = reservaService.listarReserva();
        if (reservas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerReserva(@PathVariable Integer id) {
        Reserva reserva = reservaService.obtenerReservaPorId(id);
        if (reserva == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("mensaje", "Reserva con ID " + id + " no encontrada"));
        }
        return ResponseEntity.ok(reserva);
    }

    @PostMapping
    public ResponseEntity<?> registrarReserva(@RequestBody Reserva reserva) {
        try {
            Reserva nueva = reservaService.guardarReserva(reserva);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("mensaje", "Reserva registrada correctamente", "idReserva", nueva.getIdReserva()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al registrar la reserva"));
        }
    }

    @PutMapping
    public ResponseEntity<?> actualizarReserva(@RequestBody Reserva reserva) {
        Reserva existente = reservaService.obtenerReservaPorId(reserva.getIdReserva());
        if (existente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("mensaje", "Reserva no encontrada para actualizar"));
        }

        try {
            reservaService.guardarReserva(reserva);
            return ResponseEntity.ok(Map.of("mensaje", "Reserva actualizada correctamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al actualizar la reserva"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarReserva(@PathVariable Integer id) {
        Reserva reservaExistente = reservaService.obtenerReservaPorId(id);
        if (reservaExistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("mensaje", "Reserva con ID " + id + " no encontrada"));
        }

        try {
            reservaService.eliminarReserva(id);
            return ResponseEntity.ok(Map.of("mensaje", "Reserva eliminada correctamente"));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "No se puede eliminar la reserva porque tiene transportes asociados. "
                            + "Primero elimine el transporte."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al eliminar la reserva con ID " + id));
        }
    }

    @PostMapping("/enviar-todas")
    public ResponseEntity<?> enviarTodasLasReservas() {
        reservaService.reenviarTodasLasReservas();
        return ResponseEntity.ok(Map.of("mensaje", "Todas las reservas fueron enviadas a RabbitMQ correctamente"));
    }
}
