package exakis.atlantis.metricpersistence.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Metric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private float value;

    @ManyToOne
    @JoinColumn(name = "sensor_name", referencedColumnName = "name")
    private Sensor sensor;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }
}
