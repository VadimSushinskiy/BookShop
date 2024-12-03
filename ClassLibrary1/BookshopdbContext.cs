using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ClassLibrary1;

public partial class BookshopdbContext : DbContext
{
    public BookshopdbContext()
    {
    }

    public BookshopdbContext(DbContextOptions<BookshopdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Author> Authors { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Publishing> Publishings { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=bookshopdb;Trusted_Connection=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasIndex(e => e.AuthorId, "IX_Books_AuthorId");

            entity.HasIndex(e => e.PublishingId, "IX_Books_PublishingId");

            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Author).WithMany(p => p.Books).HasForeignKey(d => d.AuthorId);

            entity.HasOne(d => d.Publishing).WithMany(p => p.Books).HasForeignKey(d => d.PublishingId);
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasIndex(e => e.UserId, "IX_Carts_UserId");

            entity.Property(e => e.TotalPrice).HasColumnType("decimal(18, 2)");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasIndex(e => e.BookId, "IX_Orders_BookId");

            entity.HasIndex(e => e.CartId, "IX_Orders_CartId");

            entity.HasOne(d => d.Book).WithMany(p => p.Orders).HasForeignKey(d => d.BookId);

            entity.HasOne(d => d.Cart).WithMany(p => p.Orders).HasForeignKey(d => d.CartId);
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasIndex(e => e.BookId, "IX_Reviews_BookId");

            entity.HasIndex(e => e.UserId, "IX_Reviews_UserId");

            entity.HasOne(d => d.Book).WithMany(p => p.Reviews).HasForeignKey(d => d.BookId);

            entity.HasOne(d => d.User).WithMany(p => p.Reviews).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.CartId, "IX_Users_CartId").IsUnique();

            entity.HasOne(d => d.Cart).WithOne(p => p.User).HasForeignKey<User>(d => d.CartId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
