using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Calculation.Engine.models;
using Quartz;

namespace Calculation.Engine
{
    public class DbSaver : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            var calculation = (CalculationTask) context.MergedJobDataMap.Get("calculation");
            try
            {
                using (StatisticContext dbContext = new StatisticContext())
                {
                    dbContext.Database.EnsureCreated();

                    foreach (KeyValuePair<String, Statistic> kvp in calculation.GetMeansBySensor)
                    {
                        StatisticType statisticType =  dbContext.StatisticTypes.Single(st => st.Name == "Mean");
                        kvp.Value.StatisticType = statisticType;
                        dbContext.Statistics.Add(kvp.Value);
                    }

                    dbContext.SaveChanges();
                    calculation.GetMeansBySensor.Clear();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            Console.WriteLine("Db saver: ");
            return Task.FromResult(0);
        }
    }
}