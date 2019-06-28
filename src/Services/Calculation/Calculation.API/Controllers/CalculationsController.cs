using System;
using System.Collections.Generic;
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
            [FromQuery] int when
        )
        {
            using (StatisticContext context = new StatisticContext())
            {
                IEnumerable<Statistic> statistics = context.Statistics.Where(s => 
                    s.SensorName == sensorId && 
                    s.StatisticType.Name == aggregationType
                );

                IEnumerable<IGrouping<int, Statistic>> groupedStatistics;
                
                switch (groupBy)
                {
                    case "day":
                        groupedStatistics = statistics
                            .Where(s => s.EndAt.Month == when)
                            .GroupBy(s => s.EndAt.Day);
                        break;
                    case "month":
                        groupedStatistics = statistics
                            .Where(s => s.EndAt.Year == when)
                            .GroupBy(s => s.EndAt.Month);
                        break;
                    case "year":
                        groupedStatistics = statistics.GroupBy(s => s.EndAt.Year);
                        break;
                    default:
                        groupedStatistics = statistics
                            .Where(s => s.EndAt.Day == when)
                            .GroupBy(s => s.EndAt.Hour);
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