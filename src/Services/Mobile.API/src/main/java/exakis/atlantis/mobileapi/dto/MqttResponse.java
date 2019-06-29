package exakis.atlantis.mobileapi.dto;

public class MqttResponse {
    private String packetIdentifier;
    private String reasonCode;
    private String reasonString;

    public String getPacketIdentifier() {
        return packetIdentifier;
    }

    public void setPacketIdentifier(String packetIdentifier) {
        this.packetIdentifier = packetIdentifier;
    }

    public String getReasonCode() {
        return reasonCode;
    }

    public void setReasonCode(String reasonCode) {
        this.reasonCode = reasonCode;
    }

    public String getReasonString() {
        return reasonString;
    }

    public void setReasonString(String reasonString) {
        this.reasonString = reasonString;
    }
}
