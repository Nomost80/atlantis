package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.models.Device;
import exakis.atlantis.mobileapi.models.Metric;
import exakis.atlantis.mobileapi.models.Sensor;
import exakis.atlantis.mobileapi.repositories.DeviceRepository;
import exakis.atlantis.mobileapi.repositories.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("devices")
public class DevicesController {
    private DeviceRepository deviceRepository;
    private SensorRepository sensorRepository;

    public DevicesController(DeviceRepository deviceRepository, SensorRepository sensorRepository) {
        this.deviceRepository = deviceRepository;
        this.sensorRepository = sensorRepository;
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

    @GetMapping("{mac}/last_metrics")
    public Iterable<Metric> getLastMetrics(@PathVariable String mac) {
        return null;
    }
}
