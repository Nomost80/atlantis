using System;
using System.Collections.Generic;
using System.Threading;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using MQTTnet.Formatter;
using Newtonsoft.Json;

namespace Calculation.Engine
{
    class Program
    {
        static void Main(string[] args)
        {
            IMqttClient mqttClient = new MqttFactory().CreateMqttClient();
            IMqttClientOptions options = new MqttClientOptionsBuilder()
                .WithTcpServer("192.168.43.153", 1883)
                .WithProtocolVersion(MqttProtocolVersion.V311)
                .Build();
            
            mqttClient.ConnectAsync(options);
            mqttClient.UseConnectedHandler(e =>
                {
                    mqttClient.SubscribeAsync(new TopicFilterBuilder().WithTopic("metric").WithAtMostOnceQoS().Build());
                });
            mqttClient.UseApplicationMessageReceivedHandler(e =>
            {
                String json = e.ApplicationMessage.Payload.ToString();
                Metric metric = JsonConvert.DeserializeObject<Metric>(json);
                MeanTask meanTask = new MeanTask();
                ThreadPool.QueueUserWorkItem(meanTask.compute, metric);
            });
        }
    }
}
