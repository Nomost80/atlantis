package exakis.atlantis.mobileapi.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity
public class Sensor {
    private int pin;

    @Id
    @Column(length = 25)
    private String name;

    private String type;

    @ManyToOne
    @JoinColumn(name = "device_mac_address", referencedColumnName = "macAddress")
    private Device device;

    @OneToMany(mappedBy = "sensor")
    @JsonBackReference
    private List<Metric> metrics;

    public int getPin() {
        return pin;
    }

    public void setPin(int pin) {
        this.pin = pin;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public List<Metric> getMetrics() {
        return metrics;
    }

    public void setMetrics(List<Metric> metrics) {
        this.metrics = metrics;
    }
}
