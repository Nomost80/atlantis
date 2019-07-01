using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using MQTTnet.Formatter;
using Quartz;
using Quartz.Impl;

namespace Calculation.Engine.Business
{
    public class MetricConsumer
    {
        private readonly IMqttClient _mqttClient;
        private readonly IMqttClientOptions _mqttClientOptions;

        public MetricConsumer()
        {
            _mqttClient = new MqttFactory().CreateMqttClient();
            _mqttClientOptions = new MqttClientOptionsBuilder()
                .WithTcpServer("localhost", 1883)
                .WithProtocolVersion(MqttProtocolVersion.V311)
                .Build();
        }

        public async Task listen()
        {
            await _mqttClient.ConnectAsync(_mqttClientOptions);
            await _mqttClient.SubscribeAsync(new TopicFilterBuilder().WithTopic("metric").WithAtMostOnceQoS().Build());
            
            NewCalculationTask calculationTask = new NewCalculationTask();
            _mqttClient.ApplicationMessageReceivedHandler = new MessageListener(calculationTask);
            
            StdSchedulerFactory schedulerFactory = new StdSchedulerFactory();
            IScheduler scheduler = await schedulerFactory.GetScheduler();
            await scheduler.Start();
            
            IJobDetail job = JobBuilder.Create<NewDbSaver>()
                .WithIdentity("db-saver", "group1")
                .Build();
            job.JobDataMap.Put("calculation", calculationTask);

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("hourly-trigger", "group1")
                .StartNow()
                .WithSimpleSchedule(x => x
                    .WithIntervalInSeconds(20)
                    .RepeatForever())
                .Build();

            await scheduler.ScheduleJob(job, trigger);
        }
    }
}