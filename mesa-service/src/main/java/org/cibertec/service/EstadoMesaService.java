package org.cibertec.service;

import java.util.List;

import org.cibertec.entity.EstadoMesa;
import org.cibertec.repository.EstadoMesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;


@Service
public class EstadoMesaService {
	
    @Autowired
    private EstadoMesaRepository repo;

    public List<EstadoMesa> listarEstadoMesas() {
        return repo.findAll();
    }

    public EstadoMesa guardarEstadoMesa(EstadoMesa estadomesas) {
        return repo.save(estadomesas);
    }

    public EstadoMesa obtenerEstadoMesaPorId(Integer id) {
        return repo.findById(id).orElse(null);
    }

    @Transactional
    public EstadoMesa registrarEstadoMesa(EstadoMesa estadoMesa) {
        if (estadoMesa.getDescripcion() == null || estadoMesa.getDescripcion().trim().isEmpty()) {
            throw new IllegalArgumentException("La descripción es obligatoria");
        }
        estadoMesa.setDescripcion(estadoMesa.getDescripcion().toUpperCase().trim());

        return repo.save(estadoMesa);
    }
    
    @Transactional
    public EstadoMesa actualizarEstadoMesa(Integer id, EstadoMesa estadoMesa) {
        EstadoMesa existente = obtenerEstadoMesaPorId(id);
        if (existente == null) {
            throw new IllegalArgumentException("Estado de Mesa no encontrado");
        }

        if (estadoMesa.getDescripcion() == null || estadoMesa.getDescripcion().trim().isEmpty()) {
            throw new IllegalArgumentException("La descripción es obligatoria");
        }

        estadoMesa.setIdEstMesa(id);
        estadoMesa.setDescripcion(estadoMesa.getDescripcion().toUpperCase().trim());

        return repo.save(estadoMesa);
    }

    @Transactional
    public void eliminarEstadoMesa(Integer id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Estado de Mesa no encontrado");
        }
        repo.deleteById(id);
    }
}