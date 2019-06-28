package exakis.atlantis.mqttgenerator;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import exakis.atlantis.mqttgenerator.config.BrokerConfig;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Service;

@Service
public class Generator {
    private BrokerConfig brokerConfig;

    public Generator(BrokerConfig brokerConfig) {
        this.brokerConfig = brokerConfig;
    }

    public void run(int n) {
        try {
            MqttClient mqttClient = new MqttClient(this.brokerConfig.getHost(), MqttClient.generateClientId());
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setMqttVersion(MqttConnectOptions.MQTT_VERSION_3_1_1);
            mqttClient.connect(connOpts);

            Faker faker = new Faker();
            ObjectMapper mapper = new ObjectMapper();

            for (int i = 0; i < n; i++) {
                Metric metric = new Metric();
                metric.setMacAddress(faker.random().hex(12));
                metric.setSensorPin("A" + faker.random().nextInt(1, 10));
                metric.setSensorPinDigital(faker.bool().bool());
                metric.setSensorName(metric.getMacAddress() + faker.name().name());
                metric.setSensorType("Brightness");
                metric.setMetricValue(faker.random().nextInt(0, 255));

                String content = mapper.writeValueAsString(metric);
                MqttMessage message = new MqttMessage(content.getBytes());
                message.setQos(this.brokerConfig.getQos());
                message.setRetained(true);
                mqttClient.publish(this.brokerConfig.getTopic(), message);
            }
        } catch (MqttException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
