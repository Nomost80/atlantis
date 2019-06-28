using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Calculation.Engine.models
{
    public class Statistic
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        private int id;
        
        [Required]
        private String sensorName;

        private float sum;
        
        private int count;
        
        [Required]
        private float value;
        
        [Required]
        private DateTime startAt;
        
        [Required]
        private DateTime endAt;
        
        private StatisticType statisticType;

        public int Id
        {
            get => id;
            set => id = value;
        }

        public string SensorName
        {
            get => sensorName;
            set => sensorName = value;
        }

        public float Sum
        {
            get => sum;
            set => sum = value;
        }

        public int Count
        {
            get => count;
            set => count = value;
        }

        public float Value
        {
            get => value;
            set => this.value = value;
        }

        public DateTime StartAt
        {
            get => startAt;
            set => startAt = value;
        }

        public DateTime EndAt
        {
            get => endAt;
            set => endAt = value;
        }

        public StatisticType StatisticType
        {
            get => statisticType;
            set => statisticType = value;
        }

        public override string ToString()
        {
            return $"{nameof(sensorName)}: {sensorName}, {nameof(sum)}: {sum}, {nameof(count)}: {count}, {nameof(value)}: {value}, {nameof(startAt)}: {startAt}, {nameof(endAt)}: {endAt}";
        }
    }
}