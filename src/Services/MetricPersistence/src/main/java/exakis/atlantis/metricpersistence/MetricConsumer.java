package exakis.atlantis.metricpersistence;

import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MetricConsumer {
    private static int qos = 0;
    private static String broker = "tcp://192.168.43.153:1883";
    private static String topic = "metric";
    @Autowired private IMqttMessageListener listener;
    private final MemoryPersistence persistence = new MemoryPersistence();

    public void listen() {
        try {
            MqttClient mqttClient = new MqttClient(broker, MqttClient.generateClientId(), persistence);
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setAutomaticReconnect(true);
            connOpts.setKeepAliveInterval(60);
            connOpts.setCleanSession(false);
            connOpts.setMqttVersion(MqttConnectOptions.MQTT_VERSION_3_1_1);
            mqttClient.connect(connOpts);
            mqttClient.subscribe(topic, qos, this.listener);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
