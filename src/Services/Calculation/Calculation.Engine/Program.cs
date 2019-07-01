using System;
using Calculation.Engine.Business;

namespace Calculation.Engine
{
    class Program
    {
        static void Main(string[] args)
        {
            //test
            try
            {
                MetricConsumer metricConsumer = new MetricConsumer();
                metricConsumer.listen();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            
            Console.WriteLine("Press any key to close the application.");
            Console.ReadLine();
        }
    }
}
