using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace backend_csharp.Models.Content;

public partial class ContentContext : DbContext
{
    public ContentContext()
    {
    }

    public ContentContext(DbContextOptions<ContentContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Article> Articles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=mywebdb.cdgcimua8xgx.ap-northeast-1.rds.amazonaws.com;database=Content;uid=admin;pwd=Dd-99236567", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.35-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Article>(entity =>
        {
            entity.HasKey(e => e.ArticleId).HasName("PRIMARY");

            entity.Property(e => e.ArticleId).HasColumnName("article_id");
            entity.Property(e => e.ArticleLevelCode).HasColumnName("article_level_code");
            entity.Property(e => e.ArticleTagCode).HasColumnName("article_tag_code");
            entity.Property(e => e.ContentHtmlCh)
                .HasColumnType("text")
                .HasColumnName("content_html_ch");
            entity.Property(e => e.ContentHtmlEn)
                .HasColumnType("text")
                .HasColumnName("content_html_en");
            entity.Property(e => e.CoverUrl)
                .HasColumnType("text")
                .HasColumnName("cover_url");
            entity.Property(e => e.CreateId).HasColumnName("create_id");
            entity.Property(e => e.CreateTime)
                .HasColumnType("datetime")
                .HasColumnName("create_time");
            entity.Property(e => e.IsDeleted).HasColumnName("is_deleted");
            entity.Property(e => e.StatueCode).HasColumnName("statue_code");
            entity.Property(e => e.SummaryCh)
                .HasColumnType("text")
                .HasColumnName("summary_ch");
            entity.Property(e => e.SummaryEn)
                .HasColumnType("text")
                .HasColumnName("summary_en");
            entity.Property(e => e.TitleCh)
                .HasMaxLength(45)
                .HasColumnName("title_ch");
            entity.Property(e => e.TitleEn)
                .HasMaxLength(45)
                .HasColumnName("title_en");
            entity.Property(e => e.UpdateId).HasColumnName("update_id");
            entity.Property(e => e.UpdateTime)
                .HasColumnType("datetime")
                .HasColumnName("update_time");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
