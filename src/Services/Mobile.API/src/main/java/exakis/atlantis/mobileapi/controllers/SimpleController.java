package exakis.atlantis.mobileapi.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleController {
    @GetMapping("/whoami")
    public String whoami() {
        return "whoami";
    }
}
