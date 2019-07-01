using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Calculation.API.dto;
using Calculation.API.models;
using Microsoft.AspNetCore.Mvc;

namespace Calculation.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculationsController : ControllerBase
    {
        [HttpGet("calculation_types")]
        public ActionResult<List<StatisticType>> GetCalculationTypes()
        {
            using (StatisticContext context = new StatisticContext())
            {
                return context.StatisticTypes.ToList();
            }
        }

        [HttpGet("{sensorId}")]
        public ActionResult<List<GroupedStatisticDto>> GetCalculation(
            String sensorId, 
            [FromQuery] String aggregationType, 
            [FromQuery] String groupBy,
            [FromQuery] String startAt,
            [FromQuery] String endAt
        )
        {
            using (StatisticContext context = new StatisticContext())
            {
                DateTime startAtDate = DateTime.ParseExact(startAt, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                startAtDate.AddHours(-12);
                DateTime endAtDate = DateTime.ParseExact(endAt, "yyyy-MM-dd", CultureInfo.InvariantCulture);
                endAtDate.AddHours(-12);
                
                Console.WriteLine("startDate: " + startAtDate);
                Console.WriteLine("endDate: " + endAtDate);
                
                IEnumerable<Statistic> statistics = context.Statistics.Where(s => 
                    s.SensorName == sensorId && 
                    s.StatisticType.Name == aggregationType &&
                    s.EndAt >= startAtDate && s.EndAt <= endAtDate
                );

                IEnumerable<IGrouping<int, Statistic>> groupedStatistics;
                
                switch (groupBy)
                {
                    case "day":
                        groupedStatistics = statistics.GroupBy(s => s.EndAt.Day);
                        break;
                    case "month":
                        groupedStatistics = statistics.GroupBy(s => s.EndAt.Month);
                        break;
                    case "year":
                        groupedStatistics = statistics.GroupBy(s => s.EndAt.Year);
                        break;
                    default:
                        groupedStatistics = statistics.GroupBy(s => s.EndAt.Hour);
                        break;
                }

                return groupedStatistics
                    .Select(group => new GroupedStatisticDto
                        {
                            Key = group.Key,
                            Value = group.Sum(e => e.Value) / group.Count()
                        }
                    )
                    .ToList();
            }
        }
    }
}