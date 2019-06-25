package exakis.atlantis.metricpersistence;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Metric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Temporal(TemporalType.DATE)
    private Date metricDate;

    private float metricValue;

    private String deviceType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "macAddress", referencedColumnName = "macAddress")
    private Device device;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getMetricDate() {
        return metricDate;
    }

    public void setMetricDate(Date metricDate) {
        this.metricDate = metricDate;
    }

    public float getMetricValue() {
        return metricValue;
    }

    public void setMetricValue(float metricValue) {
        this.metricValue = metricValue;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    @Override
    public String toString() {
        return "Metric{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", metricDate=" + metricDate +
                ", metricValue=" + metricValue +
                ", deviceType='" + deviceType + '\'' +
                ", device=" + device +
                '}';
    }
}
