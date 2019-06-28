using Microsoft.EntityFrameworkCore;

namespace Calculation.API.models
{
    public class StatisticContext : DbContext
    {
        public DbSet<Statistic> Statistics { get; set; }
        public DbSet<StatisticType> StatisticTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(@"server=localhost;port=7328;database=calculations;user=root;password=root;");
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Statistic>(entity =>
            {
                entity.HasOne(s => s.StatisticType);
            });
        }
    }
}