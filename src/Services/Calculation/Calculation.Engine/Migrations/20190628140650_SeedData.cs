using Microsoft.EntityFrameworkCore.Migrations;

namespace Calculation.Engine.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "StatisticTypes",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Mean" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "StatisticTypes",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
