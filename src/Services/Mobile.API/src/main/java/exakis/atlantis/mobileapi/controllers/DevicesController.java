package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.models.Device;
import exakis.atlantis.mobileapi.repositories.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("devices")
public class DevicesController {
    @Autowired private DeviceRepository deviceRepository;

    @GetMapping
    public Iterable<Device> GetDevices(OAuth2AuthenticationToken authentication) {
        String username = authentication.getName();
        return deviceRepository.findAll();
    }
}
