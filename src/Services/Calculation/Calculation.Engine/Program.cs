using System;
using Calculation.Engine.Business;

namespace Calculation.Engine
{
    class Program
    {
        static void Main(string[] args)
        {
            MetricConsumer metricConsumer = new MetricConsumer();
            metricConsumer.listen();
            
            Console.WriteLine("Press any key to close the application.");
            Console.ReadLine();
        }
    }
}
