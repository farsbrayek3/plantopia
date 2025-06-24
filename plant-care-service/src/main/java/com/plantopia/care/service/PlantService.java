package com.plantopia.care.service;

import com.plantopia.care.entity.Plant;
import com.plantopia.care.repository.PlantRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class PlantService {

    private final PlantRepository repository;
    private final RestTemplate restTemplate;

    @Autowired
    public PlantService(PlantRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    public List<Plant> getAllPlants() {
        return repository.findAll();
    }

    public Plant createPlant(Plant plant) {
        return repository.save(plant);
    }

    public void deletePlant(Long id) {
        repository.deleteById(id);
    }

    public List<Map<String, Object>> fetchSensorData() {
        String url = "http://plant-monitoring-service/api/sensors";
        try {
            List<Map<String, Object>> sensors = restTemplate.getForObject(url, List.class);
            log.info("Fetched sensor data: {}", sensors);
            return sensors;
        } catch (Exception e) {
            log.error("Failed to fetch sensors from NestJS", e);
            return List.of();
        }
    }
}
