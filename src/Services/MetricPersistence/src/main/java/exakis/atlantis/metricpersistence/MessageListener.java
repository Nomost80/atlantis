package exakis.atlantis.metricpersistence;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

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
            Metric metric = new Metric();
            Device device = new Device();
            device.setMacAddress(metricDTO.getMacAddress());
            metric.setName(metricDTO.getName());
            metric.setMetricDate(metricDTO.getMetricDate());
            metric.setMetricValue(metricDTO.getMetricValue());
            metric.setDeviceType(metricDTO.getDeviceType());
            metric.setDevice(device);
            this.metricRepository.save(metric);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
