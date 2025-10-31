package org.cibertec.service;

import java.util.List;
import org.cibertec.entity.Rol;
import org.cibertec.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public List<Rol> listarRoles() {
        return rolRepository.findAll();
    }
}
