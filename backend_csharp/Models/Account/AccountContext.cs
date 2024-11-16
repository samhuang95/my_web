using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace backend_csharp.Models.Account;

public partial class AccountContext : DbContext
{
    public AccountContext()
    {
    }

    public AccountContext(DbContextOptions<AccountContext> options)
        : base(options)
    {
    }

    public virtual DbSet<OtpToken> OtpTokens { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=mywebdb.cdgcimua8xgx.ap-northeast-1.rds.amazonaws.com;database=Account;uid=admin;pwd=Dd-99236567", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.35-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<OtpToken>(entity =>
        {
            entity.HasKey(e => e.OtpId).HasName("PRIMARY");

            entity.ToTable("OTP_Tokens");

            entity.Property(e => e.OtpId).HasColumnName("otp_id");
            entity.Property(e => e.CreateId).HasColumnName("create_id");
            entity.Property(e => e.CreateTime)
                .HasColumnType("datetime")
                .HasColumnName("create_time");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.OtpCode)
                .HasMaxLength(20)
                .HasColumnName("otp_code");
            entity.Property(e => e.UpdateId).HasColumnName("update_id");
            entity.Property(e => e.UpdateTime)
                .HasColumnType("datetime")
                .HasColumnName("update_time");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.CreateId).HasColumnName("create_id");
            entity.Property(e => e.CreateTime)
                .HasColumnType("datetime")
                .HasColumnName("create_time");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.LangRecordCode)
                .HasDefaultValueSql("'1'")
                .HasColumnName("lang_record_code");
            entity.Property(e => e.Password)
                .HasMaxLength(45)
                .HasColumnName("password");
            entity.Property(e => e.UpdateId).HasColumnName("update_id");
            entity.Property(e => e.UpdateTime)
                .HasColumnType("datetime")
                .HasColumnName("update_time");
            entity.Property(e => e.UserFirstName)
                .HasMaxLength(45)
                .HasColumnName("user_first_name");
            entity.Property(e => e.UserImgUrl)
                .HasColumnType("text")
                .HasColumnName("user_img_url");
            entity.Property(e => e.UserLastName)
                .HasMaxLength(45)
                .HasColumnName("user_last_name");
            entity.Property(e => e.UserLevelCode).HasColumnName("user_level_code");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
