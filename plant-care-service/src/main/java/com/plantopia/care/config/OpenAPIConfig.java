package com.plantopia.care.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI plantopiaOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Plantopia - Plant Care Microservice API")
                        .version("1.0")
                        .description("Endpoints for managing connected plants and users"));
    }
}
