using Microsoft.EntityFrameworkCore;

namespace Calculation.Engine.models
{
    public class CalculationContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(@"Server=localhost;Database=calculation;Uid=cesi;Pwd=cesi_pwd;");
        }
    }
}