package org.cibertec.controller;

import java.util.HashMap;
import java.util.Map;

import org.cibertec.client.MesaFeignClient;
import org.cibertec.client.UsuarioFeignClient;
import org.cibertec.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/contador")
@CrossOrigin(origins = "http://localhost:4200")
public class ContadorController {

	
	@Autowired
    private ReservaService reservaService;

	@Autowired
    private UsuarioFeignClient usuarioClient;

	@Autowired
    private MesaFeignClient mesaClient;
    
    @GetMapping("/totales")
    public ResponseEntity<Map<String, Long>> obtenerTotales() {
        Map<String, Long> datos = new HashMap<>();
        datos.put("reservas", reservaService.contarReservas());
        datos.put("usuarios", usuarioClient.contarUsuarios());
        datos.put("mesasDisponibles", mesaClient.contarMesasDisponibles());

        return ResponseEntity.ok(datos);
    }
}
