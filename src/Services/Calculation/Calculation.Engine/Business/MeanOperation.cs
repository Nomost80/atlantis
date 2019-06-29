using System;
using System.Collections.Concurrent;
using Calculation.Engine.dto;
using Calculation.Engine.models;

namespace Calculation.Engine.Business
{
    public class MeanOperation : IOperation
    {
        private const String NAME = "Mean";
        private ConcurrentDictionary<String, Statistic> _concurrentDictionary = new ConcurrentDictionary<string, Statistic>();

        public string GetName()
        {
            return NAME;
        }

        public ConcurrentDictionary<string, Statistic> GetComputeDictionary()
        {
            return _concurrentDictionary;
        }

        public void Compute(Metric metric)
        {
            _concurrentDictionary.AddOrUpdate(
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
                    return s;
                }
            );
        }
    }
}