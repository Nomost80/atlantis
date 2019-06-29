package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.dto.CalculationRequest;
import exakis.atlantis.mobileapi.dto.CalculationResponse;
import exakis.atlantis.mobileapi.models.Metric;
import exakis.atlantis.mobileapi.repositories.MetricRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("sensors")
public class SensorController {
    private MetricRepository metricRepository;

    public SensorController(MetricRepository metricRepository) {
        this.metricRepository = metricRepository;
    }

    @GetMapping("{sensorId}/calculations")
    public Iterable<CalculationResponse> getCalculations(@PathVariable String sensorId, CalculationRequest calculationRequest) {
        RestTemplate restTemplate = new RestTemplate();
//        restTemplate.getForObject("http://localhost:5000/api/calculations/" + sensorId, CalculationResponse[].class, calculationRequest);
        return restTemplate
                .exchange(
                        "http://localhost:5000/api/calculations/" + sensorId,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<Iterable<CalculationResponse>>() {},
                        calculationRequest
                )
                .getBody();
    }

    @GetMapping("{sensorId}/latest_metrics")
    public Iterable<Metric> getLatestMetrics(@PathVariable String sensorId) {
        return this.metricRepository.findTop10BySensorNameOrderByIdDesc(sensorId);
    }
}
