package org.cibertec.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "usuario-service")
public interface UsuarioFeignClient {

    @GetMapping("/api/usuarios/count")
    Long contarUsuarios();
}