using System;

namespace Calculation.Engine.models
{
    public class StatisticType
    {
        private int id;
        private String name;

        public int Id
        {
            get => id;
            set => id = value;
        }

        public string Name
        {
            get => name;
            set => name = value;
        }
    }
}