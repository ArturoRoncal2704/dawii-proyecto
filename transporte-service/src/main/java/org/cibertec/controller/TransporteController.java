package org.cibertec.controller;

import java.util.List;
import java.util.Map;

import org.cibertec.entity.Transporte;
import org.cibertec.service.TransporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transportes")
@CrossOrigin(origins = "http://localhost:4200")
public class TransporteController {

    @Autowired
    private TransporteService transporteService;

    @GetMapping
    public ResponseEntity<?> listarTransportes() {
        List<Transporte> lista = transporteService.listarTransportes();
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerTransporte(@PathVariable Integer id) {
        Transporte transporte = transporteService.obtenerTransportePorId(id);
        if (transporte == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("mensaje", "Transporte con ID " + id + " no encontrado"));
        }
        return ResponseEntity.ok(transporte);
    }

    @PostMapping
    public ResponseEntity<?> registrarTransporte(@RequestBody Transporte transporte) {
        try {
            Transporte nuevo = transporteService.registrarTransporte(transporte);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(
                            "mensaje", "Transporte registrado correctamente",
                            "idTransporte", nuevo.getIdTransporte()
                    ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al registrar el transporte"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarTransporte(
            @PathVariable Integer id,
            @RequestBody Transporte transporte) {
        try {
            transporteService.actualizarTransporte(id, transporte);
            return ResponseEntity.ok(Map.of("mensaje", "Transporte actualizado exitosamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al actualizar el transporte"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarTransporte(@PathVariable Integer id) {
        try {
            transporteService.eliminarTransporte(id);
            return ResponseEntity.ok(Map.of("mensaje", "Transporte eliminado correctamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al eliminar el transporte"));
        }
    }
}
