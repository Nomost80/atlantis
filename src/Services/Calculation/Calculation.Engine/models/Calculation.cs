using System;

namespace Calculation.Engine
{
    public class Calculation
    {
        private String sensorName;
        private float value;
        private DateTime startAt;
        private DateTime endAt;

        public string SensorName
        {
            get => sensorName;
            set => sensorName = value;
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
    }
}