package org.cibertec.service;

import java.util.List;

import org.cibertec.entity.EstadoMesa;
import org.cibertec.repository.IEstadoMesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EstadoMesaService {
    @Autowired
    private IEstadoMesaRepository repo;

    public List<EstadoMesa> listarEstadoMesas() {
        return repo.findAll();
    }

    public EstadoMesa guardarEstadoMesa(EstadoMesa estadomesas) {
        return repo.save(estadomesas);
    }

    public EstadoMesa obtenerEstadoMesaPorId(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminarEstadoMesa(Integer id) {
        repo.deleteById(id);
    }
}