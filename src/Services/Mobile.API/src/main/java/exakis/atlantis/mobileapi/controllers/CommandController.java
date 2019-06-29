package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.dto.Command;
import exakis.atlantis.mobileapi.dto.MqttResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("commands")
public class CommandController {
    @PostMapping
    public MqttResponse sendCommand(@RequestBody Command command) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject("http://localhost:5000/commands", command, MqttResponse.class);
    }
}
