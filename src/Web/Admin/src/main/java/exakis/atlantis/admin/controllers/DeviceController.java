package exakis.atlantis.admin.controllers;

import exakis.atlantis.admin.models.Device;
import exakis.atlantis.admin.models.User;
import exakis.atlantis.admin.repositories.DeviceRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("devices")
public class DeviceController {
    private DeviceRepository deviceRepository;

    public DeviceController(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @GetMapping
    public Iterable<Device> getDevices() {
        return this.deviceRepository.findAll();
    }

    @PostMapping("{deviceId}/user")
    public boolean addUser(@PathVariable String deviceId, @RequestBody User user) {
        Device device = this.deviceRepository.findById(deviceId).orElseThrow(() -> new IllegalArgumentException("Invalid device id"));
        device.setUser(user);
        this.deviceRepository.save(device);
        return true;
    }
}
