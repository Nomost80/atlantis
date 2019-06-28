using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Calculation.API.dto;
using Calculation.Engine.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;

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
                    case "hour":
                        return statistics
                            .Where(s => s.EndAt.Day == when)
                            .GroupBy(
                                s => s.EndAt.Hour, 
                                (i, enumerable) => new GroupedStatisticDto
                                    {
                                        Key = i, 
                                        Value = enumerable.Sum(e => e.Value) / enumerable.Count()
                                    }
                            )
                            .ToList();
                    case "day":
                        return null;
                    case "month":
                        return null;
                    case "year":
                        return null;
                    default:
                        return null;
                }
            }
        }
    }
}