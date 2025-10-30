package org.cibertec.controller;

import java.util.List;
import java.util.Map;

import org.cibertec.entity.Mesa;
import org.cibertec.service.MesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mesas")
@CrossOrigin(origins = "http://localhost:4200")
public class MesaController {

    @Autowired
    private MesaService mesaService;

    @GetMapping
    public ResponseEntity<?> listarMesas() {
        List<Mesa> lista = mesaService.listarMesas();
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerMesa(@PathVariable Integer id) {
        Mesa mesa = mesaService.obtenerMesaPorId(id);
        if (mesa == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("mensaje", "Mesa con ID " + id + " no encontrada"));
        }
        return ResponseEntity.ok(mesa);
    }

    @PostMapping
    public ResponseEntity<?> registrarMesa(@RequestBody Mesa mesa) {
        try {
            Mesa nueva = mesaService.registrarMesa(mesa);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("mensaje", "Mesa registrada exitosamente", "idMesa", nueva.getIdMesa()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al registrar la mesa"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarMesa(@PathVariable Integer id, @RequestBody Mesa mesa) {
        try {
            mesaService.actualizarMesa(id, mesa);
            return ResponseEntity.ok(Map.of("mensaje", "Mesa actualizada exitosamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al actualizar la mesa"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarMesa(@PathVariable Integer id) {
        try {
            mesaService.eliminarMesa(id);
            return ResponseEntity.ok(Map.of("mensaje", "Mesa eliminada correctamente"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al eliminar la mesa"));
        }
    }

    @GetMapping("/disponibles")
    public ResponseEntity<?> listarMesasDisponibles() {
        List<Mesa> lista = mesaService.listarMesasDisponibles();
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/disponibles/count")
    public ResponseEntity<Long> contarMesasDisponibles() {
        long total = mesaService.contarMesasDisponibles();
        return ResponseEntity.ok(total);
    }
}
