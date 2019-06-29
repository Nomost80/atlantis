package exakis.atlantis.mobileapi.models;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;

@Entity
@NamedNativeQuery(name = "Device.getDeviceSensors", query = "SELECT * FROM iot.device d JOIN iot.sensor ON d.mac_address = sensor.device_mac_address WHERE d.user_id = ?1 AND d.mac_address = ?2", resultClass = Device.class)
public class Device {
    @Id
    @Column(length = 25)
    private String macAddress;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = true)
    private User user;

    @OneToMany(mappedBy = "device", fetch = FetchType.LAZY)
    private List<Sensor> sensors;

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Sensor> getSensors() {
        return sensors;
    }

    public void setSensors(List<Sensor> sensors) {
        this.sensors = sensors;
    }
}
