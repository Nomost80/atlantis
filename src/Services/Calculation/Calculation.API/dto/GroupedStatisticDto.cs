using System.Collections.Generic;
using Calculation.Engine.models;

namespace Calculation.API.dto
{
    public class GroupedStatisticDto
    {
        private int key;
        private float value;

        public int Key
        {
            get => key;
            set => key = value;
        }

        public float Value
        {
            get => value;
            set => this.value = value;
        }
    }
}