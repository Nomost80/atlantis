package exakis.atlantis.mqttgenerator;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import java.util.Calendar;
import java.util.Date;

public class Generator {
    public static void run(int n) {
        try {
            int qos = 1;
            String broker = "ws://localhost:8083/mqtt";
            String topic = "metric";

            MqttClient mqttClient = new MqttClient(broker, MqttClient.generateClientId());
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setMqttVersion(MqttConnectOptions.MQTT_VERSION_3_1_1);
            mqttClient.connect(connOpts);

            Faker faker = new Faker();
            ObjectMapper mapper = new ObjectMapper();

            Calendar cal = Calendar.getInstance();
            Date today = cal.getTime();
            cal.add(Calendar.YEAR, -1);
            Date previousYear = cal.getTime();

            for (int i = 0; i < n; i++) {
                Metric metric = new Metric();
                metric.setMacAddress(faker.random().hex(12));
                metric.setName(faker.name().name());
                metric.setMetricDate(faker.date().between(previousYear, today));
                metric.setMetricValue(faker.random().nextInt(0, 255));
                metric.setDeviceType("humiditySensor");

                String content = mapper.writeValueAsString(metric);
                MqttMessage message = new MqttMessage(content.getBytes());
                message.setQos(qos);
                mqttClient.publish(topic, message);
            }
        } catch (MqttException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
