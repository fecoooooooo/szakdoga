using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Registry_Backend.Models;

public partial class RegistryContext : IdentityDbContext<IdentityUser>
{
    public RegistryContext()
    {
    }

    public RegistryContext(DbContextOptions<RegistryContext> options)
        : base(options)
    {
    }



    public virtual DbSet<Device> Devices { get; set; }

    public virtual DbSet<DeviceHistory> DeviceHistories { get; set; }

    public virtual DbSet<Software> Softwares { get; set; }

    public virtual DbSet<SoftwareHistory> SoftwareHistories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=registry;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
       

        modelBuilder.Entity<Device>(entity =>
        {
            entity.ToTable("Device");

            entity.HasIndex(e => e.SerialNumber, "IX_Device").IsUnique();

            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Link).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(250);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.SerialNumber).HasMaxLength(50);
            entity.Property(e => e.UserId).HasMaxLength(450);
        });

        modelBuilder.Entity<DeviceHistory>(entity =>
        {
            entity.ToTable("DeviceHistory");

            entity.Property(e => e.UserId).HasMaxLength(450);
        });

        modelBuilder.Entity<Software>(entity =>
        {
            entity.ToTable("Software");

            entity.HasIndex(e => e.License, "IX_Software").IsUnique();

            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.License).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(250);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ProductLink).HasMaxLength(250);
            entity.Property(e => e.UserId).HasMaxLength(450);
        });

        modelBuilder.Entity<SoftwareHistory>(entity =>
        {
            entity.ToTable("SoftwareHistory");

            entity.Property(e => e.UserId).HasMaxLength(450);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
