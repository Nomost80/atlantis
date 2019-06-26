package exakis.atlantis.mobileapi.models;

import javax.persistence.*;
import java.util.List;

@Entity
@NamedEntityGraph(
    name = "device.sensors",
    attributeNodes = {
        @NamedAttributeNode(value = "sensors", subgraph = "sensor.metrics")
    },
    subgraphs = {
        @NamedSubgraph(
            name = "sensor.metrics",
            attributeNodes = {
                @NamedAttributeNode(value = "metrics")
            }
        )
    }
)
public class Device {
    @Id
    @Column(length = 25)
    private String macAddress;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = true)
    private User user;

    @OneToMany(mappedBy = "device")
    private List<Sensor> sensors;

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

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
