using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Calculation.Engine.models;
using Quartz;

namespace Calculation.Engine.Business
{
    public class NewDbSaver : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            Console.WriteLine("Starting statistics persistence in database");
            var calculation = (INewCalculationTask) context.MergedJobDataMap.Get("calculation");
            try
            {
                using (StatisticContext dbContext = new StatisticContext())
                {
                    dbContext.Database.EnsureCreated();

                    foreach (var operation in calculation.GetOperations())
                    {
                        foreach (KeyValuePair<String, Statistic> kvp in operation.GetComputeDictionary())
                        {
                            StatisticType statisticType =  dbContext.StatisticTypes.Single(st => st.Name == operation.GetName());
                            kvp.Value.StatisticType = statisticType;
                            dbContext.Statistics.Add(kvp.Value);
                        }
                        operation.GetComputeDictionary().Clear();
                    }
                    
                    dbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            Console.WriteLine("Persistence finished");
            return Task.FromResult(0);
        }
    }
}