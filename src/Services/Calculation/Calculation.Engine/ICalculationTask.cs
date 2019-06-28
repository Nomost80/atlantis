using System;
using System.Collections.Concurrent;
using Calculation.Engine.models;

namespace Calculation.Engine
{
    public interface ICalculationTask
    {
        void Run(object state);
    }
}