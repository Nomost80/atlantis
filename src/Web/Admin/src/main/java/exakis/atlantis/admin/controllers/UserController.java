package exakis.atlantis.admin.controllers;

import exakis.atlantis.admin.models.Device;
import exakis.atlantis.admin.models.User;
import exakis.atlantis.admin.repositories.DeviceRepository;
import exakis.atlantis.admin.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {
    private UserRepository userRepository;
    private DeviceRepository deviceRepository;

    public UserController(UserRepository userRepository, DeviceRepository deviceRepository) {
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;
    }

    @GetMapping
    public Iterable<User> getUsers() {
        return this.userRepository.findAll();
    }

    @PostMapping("{userId}/devices")
    public boolean addDeviceToUser(@PathVariable String userId, @RequestBody Device device) {
        User user = this.userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user id"));
        device.setUser(user);
        this.deviceRepository.save(device);
        return true;
    }
}
