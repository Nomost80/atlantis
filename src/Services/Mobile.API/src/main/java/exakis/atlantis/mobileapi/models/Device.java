package exakis.atlantis.mobileapi.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Device {
    @Id
    @Column(length = 25)
    private String macAddress;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "device")
    private List<Metric> metrics;

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
}
