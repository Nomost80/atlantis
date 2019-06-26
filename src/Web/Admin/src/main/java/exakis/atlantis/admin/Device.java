package exakis.atlantis.admin;

import javax.persistence.*;

@Entity
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
