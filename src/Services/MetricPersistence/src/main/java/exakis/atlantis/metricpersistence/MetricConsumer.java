package exakis.atlantis.metricpersistence;

import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MetricConsumer {
    private static int qos = 1;
    private static String broker = "ws://localhost:8083/mqtt";
    private static String topic = "metric";
//    private static String topic = "44:81:C0:0D:6C:E3/command";
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
