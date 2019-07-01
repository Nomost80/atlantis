package exakis.atlantis.metricpersistence.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Device {
    @Id
    @Column(length = 25)
    private String macAddress;

    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL)
    private List<Sensor> sensors;

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public List<Sensor> getSensors() {
        return sensors;
    }

    public void setSensors(List<Sensor> sensors) {
        this.sensors = sensors;
    }
}
