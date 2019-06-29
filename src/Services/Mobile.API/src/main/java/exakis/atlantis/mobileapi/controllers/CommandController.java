package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.dto.Command;
import exakis.atlantis.mobileapi.dto.MqttResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("commands")
public class CommandController {
    @PostMapping
    @ResponseBody
    public MqttResponse sendCommand(@RequestBody Command command) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject("http://localhost:5000/api/commands", command, MqttResponse.class);
    }
}
