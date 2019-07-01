package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.dtos.CalculationRequest;
import exakis.atlantis.mobileapi.dtos.CalculationResponse;
import exakis.atlantis.mobileapi.models.Metric;
import exakis.atlantis.mobileapi.repositories.MetricRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("sensors")
public class SensorController {
    private MetricRepository metricRepository;

    public SensorController(MetricRepository metricRepository) {
        this.metricRepository = metricRepository;
    }

    @GetMapping("{sensorId}/calculations")
    @ResponseBody
    public Iterable<CalculationResponse> getCalculations(@PathVariable String sensorId, CalculationRequest calculationRequest) {
        System.out.println(calculationRequest.getAggregationType());
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("http://localhost:5000/api/calculations/" + sensorId)
                .queryParam("aggregationType", calculationRequest.getAggregationType())
                .queryParam("groupBy", calculationRequest.getGroupBy())
                .queryParam("startAt", calculationRequest.getStartAt())
                .queryParam("endAt", calculationRequest.getEndAt());

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate
                .exchange(
                        builder.toUriString(),
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<Iterable<CalculationResponse>>() {}
                )
                .getBody();
    }

    @GetMapping("{sensorId}/latest_metrics")
    public Iterable<Metric> getLatestMetrics(@PathVariable String sensorId) {
        System.out.println("sensorId: " + sensorId);
        return this.metricRepository.latestMetrics(sensorId);
    }
}
