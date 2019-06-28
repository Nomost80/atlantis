using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using MQTTnet.Formatter;
using Quartz;
using Quartz.Impl;

namespace Calculation.Engine
{
    public class MetricConsumer
    {
        private IMqttClient _mqttClient;
        private IMqttClientOptions _mqttClientOptions;

        public MetricConsumer()
        {
            _mqttClient = new MqttFactory().CreateMqttClient();
            _mqttClientOptions = new MqttClientOptionsBuilder()
                .WithTcpServer("192.168.43.153", 1883)
                .WithProtocolVersion(MqttProtocolVersion.V311)
                .Build();
        }

        public async void listen()
        {
            await _mqttClient.ConnectAsync(_mqttClientOptions);
            await _mqttClient.SubscribeAsync(new TopicFilterBuilder().WithTopic("metric").WithAtMostOnceQoS().Build());
            
            CalculationTask calculationTask = new CalculationTask();
            _mqttClient.ApplicationMessageReceivedHandler = new MessageListener(calculationTask);
            
            StdSchedulerFactory schedulerFactory = new StdSchedulerFactory();
            IScheduler scheduler = await schedulerFactory.GetScheduler();
            await scheduler.Start();
            
            IJobDetail job = JobBuilder.Create<DbSaver>()
                .WithIdentity("db-saver", "group1")
                .Build();
            job.JobDataMap.Put("calculation", calculationTask);

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("hourly-trigger", "group1")
                .StartNow()
                .WithSimpleSchedule(x => x
                    .WithIntervalInSeconds(60)
                    .RepeatForever())
                .Build();

            await scheduler.ScheduleJob(job, trigger);
        }
    }
}