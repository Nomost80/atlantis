package exakis.atlantis.mobileapi.dtos;

import java.io.Serializable;

public class MqttResponse implements Serializable {
    private String packetIdentifier;
    private int reasonCode;
    private String reasonString;

    public String getPacketIdentifier() {
        return packetIdentifier;
    }

    public void setPacketIdentifier(String packetIdentifier) {
        this.packetIdentifier = packetIdentifier;
    }

    public int getReasonCode() {
        return reasonCode;
    }

    public void setReasonCode(int reasonCode) {
        this.reasonCode = reasonCode;
    }

    public String getReasonString() {
        return reasonString;
    }

    public void setReasonString(String reasonString) {
        this.reasonString = reasonString;
    }
}
