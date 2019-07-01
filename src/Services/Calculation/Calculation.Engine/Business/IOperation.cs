using System;
using System.Collections.Concurrent;
using Calculation.Engine.dto;
using Calculation.Engine.models;

namespace Calculation.Engine.Business
{
    public interface IOperation
    {
        String GetName();
        ConcurrentDictionary<String, Statistic> GetComputeDictionary();
        void Compute(Metric metric);
    }
}