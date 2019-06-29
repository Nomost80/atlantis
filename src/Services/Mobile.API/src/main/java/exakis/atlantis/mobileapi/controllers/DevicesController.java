package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.models.Device;
import exakis.atlantis.mobileapi.repositories.DeviceRepository;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("devices")
public class DevicesController {
    private DeviceRepository deviceRepository;

    public DevicesController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @GetMapping
    public Iterable<Device> getDevices(OAuth2AuthenticationToken auth) {
        OAuth2User user = auth.getPrincipal();
        String id = user.getAttributes().get("oid").toString();
        System.out.println("id: " + id);
        return deviceRepository.findByUserId(id);
    }

    @GetMapping("{macAddress}/sensors")
    Device getDeviceSensors(OAuth2AuthenticationToken auth, @PathVariable String macAddress) {
        OAuth2User user = auth.getPrincipal();
        String userId = user.getAttributes().get("oid").toString();
        return deviceRepository.findByUserIdAndMacAddress(userId, macAddress);
    }
}
