package exakis.atlantis.metricpersistence.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Sensor {
    private String pin;

    private boolean digital;

    @Id @Column(length = 25)
    private String name;

    private String type;

    @ManyToOne
    @JoinColumn(name = "device_mac_address", referencedColumnName = "macAddress")
    private Device device;

    @OneToMany(mappedBy = "sensor", cascade = CascadeType.ALL)
    private List<Metric> metrics;

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public boolean isDigital() {
        return digital;
    }

    public void setDigital(boolean digital) {
        this.digital = digital;
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

    public void addMetric(Metric metric) {
        this.metrics.add(metric);
    }
}
