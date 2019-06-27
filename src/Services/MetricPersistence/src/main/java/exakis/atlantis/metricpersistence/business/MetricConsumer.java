package exakis.atlantis.metricpersistence.business;

import exakis.atlantis.metricpersistence.config.BrokerConfig;
import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.stereotype.Service;

@Service
public class MetricConsumer {
    private BrokerConfig brokerConfig;
    private IMqttMessageListener listener;
    private final MemoryPersistence persistence = new MemoryPersistence();

    public MetricConsumer(BrokerConfig brokerConfig, IMqttMessageListener listener) {
        this.brokerConfig = brokerConfig;
        this.listener = listener;
    }

    public void listen() {
        try {
            MqttClient mqttClient = new MqttClient(this.brokerConfig.getHost(), MqttClient.generateClientId(), persistence);
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setAutomaticReconnect(true);
            connOpts.setKeepAliveInterval(60);
            connOpts.setCleanSession(false);
            connOpts.setMqttVersion(MqttConnectOptions.MQTT_VERSION_3_1_1);
            mqttClient.connect(connOpts);
            mqttClient.subscribe(this.brokerConfig.getTopic(), this.brokerConfig.getQos(), this.listener);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
