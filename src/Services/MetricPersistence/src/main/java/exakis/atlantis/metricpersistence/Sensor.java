package exakis.atlantis.metricpersistence;

import javax.persistence.*;

@Entity
public class Sensor {
    private String pin;

    @Id @Column(length = 25)
    private String name;

    private String type;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "device_mac_address", referencedColumnName = "macAddress")
    private Device device;

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
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
}
