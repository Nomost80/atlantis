using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Calculation.Engine.dto;
using Calculation.Engine.models;

namespace Calculation.Engine
{
    public class CalculationTask : ICalculationTask
    {
        private ConcurrentDictionary<String, Statistic> meansBySensor;

        public void run(object state)
        {
            Console.WriteLine("calculation task started");
            Metric metric = (Metric) state;
            this.meansBySensor.AddOrUpdate(
                metric.SensorName,
                k => new Statistic
                {
                    SensorName = k,
                    Count = 1,
                    Value = metric.MetricValue,
                    StartAt = DateTime.Now,
                    EndAt = DateTime.Now
                },
                (k, s) =>
                {
                    s.Count += 1;
                    s.Sum += metric.MetricValue;
                    s.Value = s.Sum / s.Count;
                    s.EndAt = DateTime.Now;
                    Console.WriteLine(s.ToString());
                    return s;
                }
            );
            Console.WriteLine("calculation task ended");
        }
    }
}