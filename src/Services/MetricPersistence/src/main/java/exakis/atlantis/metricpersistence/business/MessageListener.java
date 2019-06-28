package exakis.atlantis.metricpersistence.business;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import exakis.atlantis.metricpersistence.dto.MetricDTO;
import exakis.atlantis.metricpersistence.model.Device;
import exakis.atlantis.metricpersistence.model.Metric;
import exakis.atlantis.metricpersistence.model.Sensor;
import exakis.atlantis.metricpersistence.repositories.DeviceRepository;
import exakis.atlantis.metricpersistence.repositories.MetricRepository;
import exakis.atlantis.metricpersistence.repositories.SensorRepository;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;

@Service
public class MessageListener implements IMqttMessageListener {
    private final ObjectMapper mapper = new ObjectMapper();
    private final TypeReference<MetricDTO> typeReference = new TypeReference<MetricDTO>() {};
    private DeviceRepository deviceRepository;
    private SensorRepository sensorRepository;
    private MetricRepository metricRepository;

    public MessageListener(
            DeviceRepository deviceRepository,
            SensorRepository sensorRepository,
            MetricRepository metricRepository
    ) {
        this.deviceRepository = deviceRepository;
        this.sensorRepository = sensorRepository;
        this.metricRepository = metricRepository;
    }

    @Override
    public void messageArrived(String s, MqttMessage mqttMessage) {
        String content = new String(mqttMessage.getPayload());
        System.out.println("Message received: " + content);
        try {
            MetricDTO metricDTO = this.mapper.readValue(content, this.typeReference);

            Device device = this.deviceRepository.findById(metricDTO.getMacAddress()).orElseGet(() -> {
                Device newDevice = new Device();
                newDevice.setMacAddress(metricDTO.getMacAddress());
                return newDevice;
            });

            Sensor sensor = this.sensorRepository.findById(metricDTO.getSensorName()).orElseGet(() -> {
                Sensor newSensor = new Sensor();
                newSensor.setName(metricDTO.getSensorName());
                newSensor.setPin(metricDTO.getSensorPin());
                newSensor.setDigital(metricDTO.isSensorPinDigital());
                newSensor.setType(metricDTO.getSensorType());
                newSensor.setDevice(device);
                return newSensor;
            });

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
