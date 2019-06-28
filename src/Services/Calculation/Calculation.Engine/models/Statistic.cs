using System;

namespace Calculation.Engine.models
{
    public class Statistic
    {
        private String sensorName;
        private float sum;
        private int count;
        private float value;
        private DateTime startAt;
        private DateTime endAt;

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

        public override string ToString()
        {
            return $"{nameof(sensorName)}: {sensorName}, {nameof(sum)}: {sum}, {nameof(count)}: {count}, {nameof(value)}: {value}, {nameof(startAt)}: {startAt}, {nameof(endAt)}: {endAt}";
        }
    }
}