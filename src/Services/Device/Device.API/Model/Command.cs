using System;

namespace Device.API.Model
{
    public class Command
    {
        private String macAddress;
        private int pin;
        private bool digital;
        private float value;
    
        public string MacAddress
        {
            get => macAddress;
            set => macAddress = value;
        }

        public int Pin
        {
            get => pin;
            set => pin = value;
        }

        public bool Digital
        {
            get => digital;
            set => digital = value;
        }

        public float Value
        {
            get => value;
            set => this.value = value;
        }
    }
}