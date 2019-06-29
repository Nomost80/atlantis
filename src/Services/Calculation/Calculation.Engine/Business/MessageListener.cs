using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Calculation.Engine.dto;
using MQTTnet;
using MQTTnet.Client.Receiving;
using Newtonsoft.Json;

namespace Calculation.Engine.Business
{
    public class MessageListener : IMqttApplicationMessageReceivedHandler
    {
        private NewCalculationTask _calculationTask;

        public MessageListener(NewCalculationTask calculationTask)
        {
            _calculationTask = calculationTask;
        }
        
        public Task HandleApplicationMessageReceivedAsync(MqttApplicationMessageReceivedEventArgs eventArgs)
        {
            String json = Encoding.Default.GetString(eventArgs.ApplicationMessage.Payload);
            Console.WriteLine("Message received: " + json);
            Metric metric = JsonConvert.DeserializeObject<Metric>(json);
            bool queued = ThreadPool.QueueUserWorkItem(_calculationTask.Run, metric);
            return Task.FromResult(queued);
        }
    }
}