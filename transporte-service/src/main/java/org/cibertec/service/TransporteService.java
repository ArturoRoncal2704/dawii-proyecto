package org.cibertec.service;

import java.util.List;

import org.cibertec.client.ReservaFeignClient;
import org.cibertec.entity.Reserva;
import org.cibertec.entity.Transporte;
import org.cibertec.repository.TransporteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import feign.FeignException;

@Service
public class TransporteService {

    @Autowired
    private TransporteRepository repo;

    @Autowired
    private ReservaFeignClient reservaClient;

    public List<Transporte> listarTransportes() {
        return repo.findAll();
    }

    public Transporte obtenerTransportePorId(Integer id) {
        return repo.findById(id).orElse(null);
    }

    @Transactional
    public Transporte registrarTransporte(Transporte transporte) {
        if (transporte.getIdReserva() == null) {
            throw new IllegalArgumentException("Debe especificar una reserva");
        }
        try {
            Reserva reserva = reservaClient.obtenerReservaPorId(transporte.getIdReserva());
            if (reserva == null) {
                throw new IllegalArgumentException("La reserva no existe");
            }
        } catch (FeignException.NotFound e) {
            throw new IllegalArgumentException("La reserva con ID " + transporte.getIdReserva() + " no existe");
        }

        if (transporte.getDireccion() == null || transporte.getDireccion().trim().isEmpty()) {
            throw new IllegalArgumentException("La dirección es obligatoria");
        }

        if (transporte.getNumeroPasajeros() == null || transporte.getNumeroPasajeros() <= 0) {
            throw new IllegalArgumentException("El número de pasajeros debe ser mayor a 0");
        }

        return repo.save(transporte);
    }

    @Transactional
    public Transporte actualizarTransporte(Integer id, Transporte transporte) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Transporte no encontrado");
        }
        if (transporte.getDireccion() == null || transporte.getDireccion().trim().isEmpty()) {
            throw new IllegalArgumentException("La dirección es obligatoria");
        }

        if (transporte.getNumeroPasajeros() == null || transporte.getNumeroPasajeros() <= 0) {
            throw new IllegalArgumentException("El número de pasajeros debe ser mayor a 0");
        }

        transporte.setIdTransporte(id);
        return repo.save(transporte);
    }

    @Transactional
    public void eliminarTransporte(Integer id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Transporte no encontrado");
        }
        repo.deleteById(id);
    }
}