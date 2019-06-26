package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.models.Device;
import exakis.atlantis.mobileapi.models.Metric;
import exakis.atlantis.mobileapi.repositories.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("devices")
public class DevicesController {
    @Autowired private DeviceRepository deviceRepository;

    @GetMapping
    public Iterable<Device> GetDevices(OAuth2AuthenticationToken authentication) {
        return deviceRepository.findByUserId(1);
    }

    @GetMapping("{mac}/last_metrics")
    public Iterable<Metric> GetLastMetrics(OAuth2AuthenticationToken authentication, @PathVariable  String mac) {
        return null;
    }
}
