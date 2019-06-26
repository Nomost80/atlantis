package exakis.atlantis.metricpersistence;

import java.util.Date;

public class MetricDTO {
    private String macAddress;

    private int sensorPin;

    private String sensorName;

    private String sensorType;

    private Date metricDate;

    private float metricValue;

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public int getSensorPin() {
        return sensorPin;
    }

    public void setSensorPin(int sensorPin) {
        this.sensorPin = sensorPin;
    }

    public String getSensorName() {
        return sensorName;
    }

    public void setSensorName(String sensorName) {
        this.sensorName = sensorName;
    }

    public String getSensorType() {
        return sensorType;
    }

    public void setSensorType(String sensorType) {
        this.sensorType = sensorType;
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
}
