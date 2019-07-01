package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.dtos.CalculationType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;


@RestController
@RequestMapping("calculations")
public class CalculationController {
    @GetMapping("types")
    @ResponseBody
    public Iterable<CalculationType> getCalculationTypes() {
        RestTemplate restTemplate = new RestTemplate();
        CalculationType[] types = restTemplate.getForObject("http://localhost:5000/api/calculations/calculation_types", CalculationType[].class);
        return Arrays.asList(types);
    }
}
