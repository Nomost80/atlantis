using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Calculation.Engine.dto;
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
            MainAsync(args).GetAwaiter().GetResult();
            
            Console.WriteLine("Press any key to close the application.");
            Console.ReadLine();
        }
        
        static async Task MainAsync(string[] args)
        {
            var mqttClient = new MqttFactory().CreateMqttClient();
            var options = new MqttClientOptionsBuilder()
                .WithTcpServer("192.168.43.153", 1883)
                .WithProtocolVersion(MqttProtocolVersion.V311)
                .Build();
            
            await mqttClient.ConnectAsync(options);
            await mqttClient.SubscribeAsync(new TopicFilterBuilder().WithTopic("metric").WithAtMostOnceQoS().Build());
            
            CalculationTask calculationTask = new CalculationTask();

            mqttClient.UseApplicationMessageReceivedHandler(e =>
            {
                String json = Encoding.Default.GetString(e.ApplicationMessage.Payload);
                Console.WriteLine("Message received: " + json);
                Metric metric = JsonConvert.DeserializeObject<Metric>(json);
                Task.Factory.StartNew(() => Console.WriteLine("Test"));
//                ThreadPool.QueueUserWorkItem(calculationTask.run, metric);
            });
        }
    }
}
