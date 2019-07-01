package exakis.atlantis.admin.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@NamedNativeQuery(name = "Device.findDevicesWithoutUser", query = "SELECT * FROM iot.device d WHERE d.user_id IS NULL", resultClass = Device.class)
public class Device {
    @Id
    @Column(length = 25)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private String macAddress;

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
