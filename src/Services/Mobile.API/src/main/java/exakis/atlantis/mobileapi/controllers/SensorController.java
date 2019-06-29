package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.repositories.SensorRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SensorController {
    private SensorRepository sensorRepository;

    public SensorController(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }
}
