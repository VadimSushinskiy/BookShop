using BookShop.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BookShop.DAL
{
    public class SqlServerContext : DbContext
    {
        public SqlServerContext()
        {
            
        }

        private readonly IConfiguration _configuration;
        public virtual DbSet<Author> Authors { get; set; }

        public virtual DbSet<Book> Books { get; set; }

        public virtual DbSet<Cart> Carts { get; set; }

        public virtual DbSet<Order> Orders { get; set; }

        public virtual DbSet<Publishing> Publishings { get; set; }

        public virtual DbSet<Review> Reviews { get; set; }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=bookshopdb;Trusted_Connection=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasOne(d => d.Author).WithMany(p => p.Books).HasForeignKey(d => d.AuthorId);

                entity.HasOne(d => d.Publishing).WithMany(p => p.Books).HasForeignKey(d => d.PublishingId);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasOne(d => d.Book).WithMany(p => p.Orders).HasForeignKey(d => d.BookId);

                entity.HasOne(d => d.Cart).WithMany(p => p.Orders).HasForeignKey(d => d.CartId);
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasOne(d => d.Book).WithMany(p => p.Reviews).HasForeignKey(d => d.BookId);

                entity.HasOne(d => d.User).WithMany(p => p.Reviews).HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasOne(d => d.Cart).WithOne(p => p.User).HasForeignKey<User>(d => d.CartId);
            });

        }
    }
}
