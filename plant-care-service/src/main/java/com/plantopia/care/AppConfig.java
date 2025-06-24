package com.plantopia.care;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;

@Configuration
public class AppConfig {

    @Bean
    @LoadBalanced // This allows calling other services via their Eureka name
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
