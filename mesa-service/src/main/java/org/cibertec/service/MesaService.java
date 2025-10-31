package org.cibertec.service;

import java.util.List;

import org.cibertec.entity.Mesa;
import org.cibertec.repository.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MesaService {
    
    @Autowired
    private MesaRepository repo;

    public List<Mesa> listarMesas() {
        return repo.findAll();
    }

    public List<Mesa> listarMesasDisponibles() {
        return repo.findByEstadoMesaIdEstMesa(1);
    }

    public Mesa obtenerMesaPorId(Integer id) {
        return repo.findById(id).orElse(null);
    }

    @Transactional
    public Mesa registrarMesa(Mesa mesa) {
        return repo.save(mesa);
    }

    @Transactional
    public Mesa actualizarMesa(Integer id, Mesa mesa) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Mesa no encontrada");
        }
        mesa.setIdMesa(id);
        return repo.save(mesa);
    }

    @Transactional
    public void eliminarMesa(Integer id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Mesa no encontrada");
        }
        repo.deleteById(id);
    }

    public long contarMesasDisponibles() {
        return repo.countByEstadoMesaIdEstMesa(1);
    }
}