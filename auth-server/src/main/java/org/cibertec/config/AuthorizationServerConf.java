package org.cibertec.config;

import java.io.InputStream;
import java.security.Key;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.cert.Certificate;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;

import org.cibertec.dto.CustomUserDetails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.client.JdbcRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
@Import(OAuth2AuthorizationServerConfiguration.class)
public class AuthorizationServerConf {


	@Bean
	RegisteredClientRepository registeredClientRepository(JdbcTemplate jdbcTemplate) {
		return new JdbcRegisteredClientRepository(jdbcTemplate);
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	JWKSource<SecurityContext> jwkSource(@Value("${app.keystore.path}") Resource keystoreResource,
												@Value("${app.keystore.password}") String keystorePassword,
												@Value("${app.keystore.alias}")String alias) throws Exception{
		KeyStore ks = KeyStore.getInstance("PKCS12");
		try(InputStream is = keystoreResource.getInputStream()) {
				ks.load(is, keystorePassword.toCharArray());
		}
		
		Key key =  ks.getKey(alias, keystorePassword.toCharArray());
		if(!(key instanceof PrivateKey)) {
			throw new IllegalStateException("Keystore does not contain a private key with alias " +alias);
		}
		
		Certificate cert = ks.getCertificate(alias);
		RSAPublicKey publicKey = (RSAPublicKey) cert.getPublicKey();
		RSAPrivateKey privateKey = (RSAPrivateKey) key;
		
		RSAKey rsaKey = new RSAKey.Builder(publicKey)
				.privateKey(privateKey)
				.keyID(UUID.randomUUID().toString())
				.build();
		JWKSet jwkSet = new JWKSet(rsaKey);
		return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
	}

	@Bean
	AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
			PasswordEncoder passwordEncoder) {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder);
		
		return new ProviderManager(provider);
	}

	@Bean
	OAuth2TokenCustomizer<JwtEncodingContext> jwtCustomizer() {
		return context -> {
			Authentication principal = context.getPrincipal();
			if(context.getTokenType().equals(OAuth2TokenType.ACCESS_TOKEN) && principal.getAuthorities() != null) {
				context.getClaims().claim("roles",
						principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());
				
				Object principalObj = principal.getPrincipal();
				if(principalObj instanceof CustomUserDetails userDetails) {
					context.getClaims().claim("name",userDetails.getName());
					context.getClaims().claim("email", userDetails.getEmail());
				}
			}
		};
	}
}
