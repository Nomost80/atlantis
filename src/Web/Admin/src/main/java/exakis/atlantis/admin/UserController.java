package exakis.atlantis.admin;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import exakis.atlantis.admin.UserRepository;


@Controller
public class UserController {

    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;


    @Autowired
    public UserController(UserRepository userRepository, DeviceRepository deviceRepository) {
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;
    }

    @GetMapping("/")
    public String showIndex(User user, Model model) {
        model.addAttribute("users", userRepository.findAll());
        model.addAttribute("devices", deviceRepository.findAll());
        return "index";
    }

    @GetMapping("/add-user")
    public String showSignUpForm(User user) {
        return "add-user";
    }

    @PostMapping("/adduser")
    public String addUser(@Valid User user, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "add-user";
        }
        userRepository.save(user);
        model.addAttribute("users", userRepository.findAll());
        return "index";
    }

    @GetMapping("user/edit/{id}")
    public String showUpdateForm(@PathVariable("id") int id, Model model) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
        model.addAttribute("user", user);
        return "update-user";
    }

    @PostMapping("user/update/{id}")
    public String updateUser(@PathVariable("id") int id, @Valid User user, BindingResult result, Model model) {
        if (result.hasErrors()) {
            user.setId(id);
            return "update-user";
        }

        userRepository.save(user);
        model.addAttribute("users", userRepository.findAll());
        return "index";
    }

    @GetMapping("user/delete/{id}")
    public String deleteUser(@PathVariable("id") int id, Model model) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
        userRepository.delete(user);
        model.addAttribute("users", userRepository.findAll());
        return "index";
    }
}
