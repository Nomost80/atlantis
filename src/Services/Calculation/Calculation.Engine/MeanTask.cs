using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Calculation.Engine
{
    public class MeanTask
    {
        private ConcurrentDictionary<String, Calculation> meansBySensor;
        
        public void compute(object state)
        {
            Metric metric = (Metric) state;
            float value = 0;
            this.meansBySensor.AddOrUpdate(metric.SensorName, value, (s, f) => f + value);
        }
    }
}