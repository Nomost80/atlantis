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

    private final exakis.atlantis.admin.UserRepository userRepository;
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceController(DeviceRepository deviceRepository, UserRepository userRepository) {
        this.deviceRepository = deviceRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String showIndex(User user, Model model) {
        model.addAttribute("users", userRepository.findAll());
        model.addAttribute("devices", deviceRepository.findAll());
        return "index";
    }

    @GetMapping("device/edit/{macAdress}")
    public String showUpdateForm(@PathVariable("macAdress") String macAdress, Model model) {
        Device device = deviceRepository.findById(macAdress).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + macAdress));
        model.addAttribute("device", device);
        model.addAttribute("users", userRepository.findAll());
        return "add-device";
    }

    @PostMapping("/adddevice")
    public String addDevice(@Valid Device device, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "adddevice";
        }
        deviceRepository.save(device);
        model.addAttribute("devices", deviceRepository.findAll());
        model.addAttribute("users", userRepository.findAll());
        return "index";
    }
}
