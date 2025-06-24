package com.plantopia.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        return http
                // 1) Require authentication on your two microservice paths
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/plants/**", "/sensor/**").authenticated()
                        .anyExchange().permitAll()
                )
                // 2) Configure this gateway as a JWT‐based resource server
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(withDefaults())
                )
                .build();
    }

    @Bean
    public ReactiveJwtDecoder reactiveJwtDecoder() {
        // Tell Spring Security how to fetch your Keycloak realm's JWKs
        return NimbusReactiveJwtDecoder
                .withJwkSetUri("http://localhost:8180/realms/plantopia/protocol/openid-connect/certs")
                .build();
    }
}
