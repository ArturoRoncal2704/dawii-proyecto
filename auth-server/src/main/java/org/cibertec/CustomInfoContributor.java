package org.cibertec;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.boot.actuate.info.Info.Builder;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.stereotype.Component;



@Component

public class CustomInfoContributor implements InfoContributor {

	@Override
	public void contribute(Builder builder) {
		 builder.withDetail("application", Map.of(
			        "name", "API Recommendation",
			        "description", "Devuelve las recomendaciones de un usuario",
			        "version", "1.0.0",
			        "environment", System.getProperty("spring.profiles.active", "default")
			    ));
	
	
			    builder.withDetail("author", Map.of(
			        "name", "Julio Rebatta",
			        "email", "pjrebatt@cibertec.edu.pe"
			    ));
	
	
			    builder.withDetail("runtime", Map.of(
			        "java.version", System.getProperty("java.version"),
			        "time", LocalDateTime.now().toString()
			    ));
		
			}

}