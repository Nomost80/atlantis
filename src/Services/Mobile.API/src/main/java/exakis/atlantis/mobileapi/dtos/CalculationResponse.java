package exakis.atlantis.mobileapi.dtos;

import java.io.Serializable;

public class CalculationResponse implements Serializable {
    private int key;
    private float value;

    public int getKey() {
        return key;
    }

    public void setKey(int key) {
        this.key = key;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }
}
