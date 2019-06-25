using System;

namespace Device.API.Model
{
    public class Command
    {
        private String macAddress;
        private String name;
        private float value;

        public string MacAddress
        {
            get => macAddress;
            set => macAddress = value;
        }

        public string Name
        {
            get => name;
            set => name = value;
        }

        public float Value
        {
            get => value;
            set => this.value = value;
        }
    }
}