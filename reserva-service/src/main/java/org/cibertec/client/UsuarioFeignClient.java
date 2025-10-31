package org.cibertec.client;

import org.cibertec.config.FeignClientConfig;
import org.cibertec.config.UsuarioFeignFallback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "user-service" ,
configuration = FeignClientConfig.class,
fallback = UsuarioFeignFallback.class,
url="http://localhost:8080/user-service" )
public interface UsuarioFeignClient {

    @GetMapping("/api/usuarios/count")
    Long contarUsuarios();
}