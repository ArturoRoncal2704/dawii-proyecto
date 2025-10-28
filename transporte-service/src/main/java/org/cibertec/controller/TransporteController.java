package org.cibertec.controller;

import java.util.List;

import org.cibertec.entity.Transporte;
import org.cibertec.service.TransporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transportes")
@CrossOrigin(origins = "*")
public class TransporteController {

    @Autowired
    private TransporteService transporteService;

    @GetMapping
    public ResponseEntity<?> listarTransportes() {
        List<Transporte> lista = transporteService.listarTransportes();
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body("No hay transportes registrados");
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerTransporte(@PathVariable Integer id) {
        Transporte transporte = transporteService.obtenerTransportePorId(id);
        if (transporte != null) {
            return ResponseEntity.ok(transporte);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Transporte con ID " + id + " no encontrado");
    }

    @PostMapping
    public ResponseEntity<?> registrarTransporte(@RequestBody Transporte transporte) {
        try {
            Transporte nuevo = transporteService.registrarTransporte(transporte);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Transporte registrado correctamente con ID: " + nuevo.getIdTransporte());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al registrar el transporte");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarTransporte(
            @PathVariable Integer id,
            @RequestBody Transporte transporte) {
        try {
            transporteService.actualizarTransporte(id, transporte);
            return ResponseEntity.ok("Transporte actualizado exitosamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar el transporte");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarTransporte(@PathVariable Integer id) {
        try {
            transporteService.eliminarTransporte(id);
            return ResponseEntity.ok("Transporte eliminado correctamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el transporte");
        }
    }
}