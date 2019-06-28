using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Calculation.Engine.dto;
using Calculation.Engine.models;

namespace Calculation.Engine
{
    public class CalculationTask : ICalculationTask
    {
        private ConcurrentDictionary<String, Statistic> _meansBySensor;

        public ConcurrentDictionary<string, Statistic> GetMeansBySensor
        {
            get => _meansBySensor;
            set => _meansBySensor = value;
        }

        public CalculationTask()
        {
            _meansBySensor = new ConcurrentDictionary<string, Statistic>();
        }
        
        public void Run(object state)
        {
            Console.WriteLine("calculation task started");
            Metric metric = (Metric) state;
            _meansBySensor.AddOrUpdate(
                metric.SensorName,
                k => new Statistic
                {
                    SensorName = k,
                    Count = 1,
                    Sum = metric.MetricValue,
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