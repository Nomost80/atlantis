package exakis.atlantis.metricpersistence;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;

@Service
public class MessageListener implements IMqttMessageListener {
    private final ObjectMapper mapper = new ObjectMapper();
    private final TypeReference<MetricDTO> typeReference = new TypeReference<MetricDTO>() {};
    @Autowired private MetricRepository metricRepository;

    @Override
    public void messageArrived(String s, MqttMessage mqttMessage) {
        String content = new String(mqttMessage.getPayload());
        System.out.println("Message received: " + content);
        try {
            MetricDTO metricDTO = this.mapper.readValue(content, this.typeReference);
            Device device = new Device();
            device.setMacAddress(metricDTO.getMacAddress());

            Sensor sensor = new Sensor();
            sensor.setName(metricDTO.getSensorName());
            sensor.setPin(metricDTO.getSensorPin());
            sensor.setDigital(metricDTO.isSensorPinDigital());
            sensor.setType(metricDTO.getSensorType());
            sensor.setDevice(device);

            Metric metric = new Metric();
            metric.setDate(new Date());
            metric.setValue(metricDTO.getMetricValue());
            metric.setSensor(sensor);

            this.metricRepository.save(metric);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
