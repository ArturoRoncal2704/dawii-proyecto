package org.cibertec.config;

import org.cibertec.client.UsuarioFeignClient;
import org.springframework.stereotype.Component;

@Component
public class UsuarioFeignFallback implements UsuarioFeignClient {
    
    @Override
    public Long contarUsuarios() {
        System.out.println("Circuit breaker: usuario-service no disponible.");
        return 0L;
    }
}