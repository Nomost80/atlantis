﻿// <auto-generated />
using System;
using Calculation.Engine.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Calculation.Engine.Migrations
{
    [DbContext(typeof(StatisticContext))]
    [Migration("20190628140650_SeedData")]
    partial class SeedData
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity("Calculation.Engine.models.Statistic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("EndAt");

                    b.Property<string>("SensorName");

                    b.Property<DateTime>("StartAt");

                    b.Property<int?>("StatisticTypeId");

                    b.Property<float>("Value");

                    b.HasKey("Id");

                    b.HasIndex("StatisticTypeId");

                    b.ToTable("Statistics");
                });

            modelBuilder.Entity("Calculation.Engine.models.StatisticType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("StatisticTypes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Mean"
                        });
                });

            modelBuilder.Entity("Calculation.Engine.models.Statistic", b =>
                {
                    b.HasOne("Calculation.Engine.models.StatisticType", "StatisticType")
                        .WithMany()
                        .HasForeignKey("StatisticTypeId");
                });
#pragma warning restore 612, 618
        }
    }
}