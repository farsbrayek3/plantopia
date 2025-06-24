package com.plantopia.care.controller;

import com.plantopia.care.entity.Plant;
import com.plantopia.care.service.PlantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin
public class PlantController {

    private final PlantService service;

    public PlantController(PlantService service) {
        this.service = service;
    }

    @GetMapping
    public List<Plant> getAllPlants() {
        return service.getAllPlants();
    }

    @PostMapping
    public Plant createPlant(@RequestBody Plant plant) {
        return service.createPlant(plant);
    }

    @DeleteMapping("/{id}")
    public void deletePlant(@PathVariable Long id) {
        service.deletePlant(id);
    }
}
