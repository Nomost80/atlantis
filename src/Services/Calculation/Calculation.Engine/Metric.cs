using System;

namespace Calculation.Engine
{
    public class Metric
    {
        private String macAddress;
        private String sensorName;
        private int sensorPin;
        private bool sensorDigital;
        private String sensorType;
        private float metricValue;

        public string MacAddress
        {
            get => macAddress;
            set => macAddress = value;
        }

        public string SensorName
        {
            get => sensorName;
            set => sensorName = value;
        }

        public int SensorPin
        {
            get => sensorPin;
            set => sensorPin = value;
        }

        public bool SensorDigital
        {
            get => sensorDigital;
            set => sensorDigital = value;
        }

        public string SensorType
        {
            get => sensorType;
            set => sensorType = value;
        }

        public float MetricValue
        {
            get => metricValue;
            set => metricValue = value;
        }
    }
}