package exakis.atlantis.metricpersistence;

public class MetricDTO {
    private String macAddress;

    private String sensorPin;

    private boolean sensorPinDigital;

    private String sensorName;

    private String sensorType;

    private float metricValue;

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public String getSensorPin() {
        return sensorPin;
    }

    public void setSensorPin(String sensorPin) {
        this.sensorPin = sensorPin;
    }

    public boolean isSensorPinDigital() {
        return sensorPinDigital;
    }

    public void setSensorPinDigital(boolean sensorPinDigital) {
        this.sensorPinDigital = sensorPinDigital;
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

    public float getMetricValue() {
        return metricValue;
    }

    public void setMetricValue(float metricValue) {
        this.metricValue = metricValue;
    }
}
