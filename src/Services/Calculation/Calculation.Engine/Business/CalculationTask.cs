using System;
using System.Collections.Generic;
using System.Linq;
using Calculation.Engine.dto;

namespace Calculation.Engine.Business
{
    public class NewCalculationTask : INewCalculationTask
    {
        private List<IOperation> _operations = new List<IOperation>();

        public NewCalculationTask()
        {
            var targetType = typeof(IOperation);
            var types = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => targetType.IsAssignableFrom(p) && p.IsClass);
                
            foreach (Type type in types)
            {
                IOperation operation = (IOperation)Activator.CreateInstance(type);
                _operations.Add(operation);
            }
        }

        public void Run(object state)
        {
            Metric metric = (Metric) state;
            foreach (IOperation operation in _operations)
            {
                operation.Compute(metric);
            }
        }
        
        public List<IOperation> GetOperations()
        {
            return _operations;
        }
    }
}