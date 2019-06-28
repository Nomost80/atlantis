using Microsoft.EntityFrameworkCore;

namespace Calculation.Engine.models
{
    public class StatisticContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(@"Server=localhost:7328;Database=calculations;Uid=cesi;Pwd=cesi_pwd;");
        }
    }
}