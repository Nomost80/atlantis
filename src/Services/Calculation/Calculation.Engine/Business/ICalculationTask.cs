using System.Collections.Generic;

namespace Calculation.Engine.Business
{
    public interface INewCalculationTask
    {
        List<IOperation> GetOperations();
        void Run(object state);
    }
}