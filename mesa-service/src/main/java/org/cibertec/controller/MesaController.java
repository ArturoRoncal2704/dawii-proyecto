package org.cibertec.controller;

import java.util.List;

import org.cibertec.entity.Mesa;
import org.cibertec.service.MesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mesas")
@CrossOrigin(origins = "*")
public class MesaController {

    @Autowired
    private MesaService mesaService;

    @GetMapping
    public ResponseEntity<?> listarMesas() {
        List<Mesa> lista = mesaService.listarMesas();
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body("No hay mesas registradas");
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerMesa(@PathVariable Integer id) {
        Mesa mesa = mesaService.obtenerMesaPorId(id);
        if (mesa != null) {
            return ResponseEntity.ok(mesa);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Mesa con ID " + id + " no encontrada");
    }

    @PostMapping
    public ResponseEntity<?> registrarMesa(@RequestBody Mesa mesa) {
        try {
            Mesa nueva = mesaService.registrarMesa(mesa);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Mesa registrada exitosamente con ID: " + nueva.getIdMesa());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al registrar la mesa");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarMesa(@PathVariable Integer id, @RequestBody Mesa mesa) {
        try {
            mesaService.actualizarMesa(id, mesa);
            return ResponseEntity.ok("Mesa actualizada exitosamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar la mesa");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarMesa(@PathVariable Integer id) {
        try {
            mesaService.eliminarMesa(id);
            return ResponseEntity.ok("Mesa eliminada correctamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar la mesa");
        }
    }

    @GetMapping("/disponibles")
    public ResponseEntity<?> listarMesasDisponibles() {
        List<Mesa> lista = mesaService.listarMesasDisponibles();
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body("No hay mesas disponibles");
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/disponibles/count")
    public ResponseEntity<Long> contarMesasDisponibles() {
        long total = mesaService.contarMesasDisponibles();
        return ResponseEntity.ok(total);
    }
}