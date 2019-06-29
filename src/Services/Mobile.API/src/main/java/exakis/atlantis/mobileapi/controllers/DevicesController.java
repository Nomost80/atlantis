package exakis.atlantis.mobileapi.controllers;

import exakis.atlantis.mobileapi.models.Device;
import exakis.atlantis.mobileapi.models.Metric;
import exakis.atlantis.mobileapi.models.User;
import exakis.atlantis.mobileapi.repositories.DeviceRepository;
import exakis.atlantis.mobileapi.security.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("devices")
public class DevicesController {
    @Autowired private DeviceRepository deviceRepository;

    @GetMapping
    public Iterable<Device> getDevices(OAuth2AuthenticationToken auth) {
//        System.out.println("principal: " + principal.getName());
        OAuth2User user = auth.getPrincipal();
        String id = user.getAttributes().get("oid").toString();
        System.out.println("id: " + id);
        return deviceRepository.findByUserId(id);
    }

    @GetMapping("{mac}/last_metrics")
    public Iterable<Metric> getLastMetrics(@PathVariable String mac) {
        return null;
    }
}
