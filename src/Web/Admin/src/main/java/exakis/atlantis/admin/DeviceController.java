package exakis.atlantis.admin;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class DeviceController {

    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceController(DeviceRepository deviceRepository, UserRepository userRepository) {
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/add-device")
    public String showSignUpForm(Device device, Model model) {
        model.addAttribute("users", userRepository.findAll());
        return "add-device";
    }

    @PostMapping("/adddevice")
    public String addDevice(@Valid Device device, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "add-device";
        }
        
        deviceRepository.save(device);
        model.addAttribute("devices", deviceRepository.findAll());
        return "index";
    }


    @GetMapping("device/delete/{macAddress}")
    public String deleteDevice(@PathVariable("macAddress") String macAddress, Model model) {
        Device device = deviceRepository.findById(macAddress).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + macAddress));
        deviceRepository.delete(device);
        model.addAttribute("devices", deviceRepository.findAll());
        return "index";
    }
}
