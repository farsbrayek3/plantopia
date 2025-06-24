package com.plantopia.care.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private double humidityLevel; // taux d’humidité actuel

    private boolean needsWater; // alerte à arroser

    private String lightRequirement; // Ex: "Full Sun", "Partial Shade"
}
