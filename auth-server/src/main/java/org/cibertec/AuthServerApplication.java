package org.cibertec;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;

@SpringBootApplication
@EnableDiscoveryClient
public class AuthServerApplication implements CommandLineRunner {

    @Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
    private RegisteredClientRepository clients;
	
	public static void main(String[] args) {
		SpringApplication.run(AuthServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
        if (clients.findByClientId("angular-spa") == null) {
            RegisteredClient spa = RegisteredClient.withId(UUID.randomUUID().toString())
                    .clientId("angular-spa")
                    .clientAuthenticationMethods(c -> c.add(ClientAuthenticationMethod.NONE))
                    .authorizationGrantTypes(c -> c.add(AuthorizationGrantType.AUTHORIZATION_CODE))
                    .redirectUri("http://localhost:4200")
                    .postLogoutRedirectUri("http://localhost:4200")
                    .clientSecret(passwordEncoder.encode("clave-secreta"))
                    .scope(OidcScopes.OPENID)
                    .scope("api.read")
                    .clientSettings(ClientSettings.builder().requireProofKey(true).build())
                    .tokenSettings(TokenSettings.builder().build())
                    .clientName("Angular SPA")
                    .build();
            clients.save(spa);
        } else {
            System.out.println("Cliente 'angular-spa' ya existe");
        }

        if (clients.findByClientId("postman-client") == null) {
            RegisteredClient postman = RegisteredClient.withId(UUID.randomUUID().toString())
                    .clientId("postman-client")
                    .clientSecret(passwordEncoder.encode("postman-secret"))
                    .clientAuthenticationMethods(c -> c.add(ClientAuthenticationMethod.CLIENT_SECRET_BASIC))
                    .authorizationGrantTypes(c -> {
                        c.add(AuthorizationGrantType.CLIENT_CREDENTIALS);
                        c.add(AuthorizationGrantType.PASSWORD); // Para probar con usuario/contraseña
                    })
                    .scope("api.read")
                    .scope("api.write")
                    .tokenSettings(TokenSettings.builder().build())
                    .clientName("Postman Client")
                    .build();

            clients.save(postman);
        } else {
            System.out.println("Cliente 'postman-client' ya existe");
        }
    }

}
