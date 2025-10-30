package org.cibertec.client;

import org.cibertec.config.FeignClientConfig;
import org.cibertec.config.UsuarioFeignFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "usuario-service" ,
configuration = FeignClientConfig.class,
fallback = UsuarioFeignFallback.class)
public interface UsuarioFeignClient {

    @GetMapping("/api/usuarios/count")
    Long contarUsuarios();
}