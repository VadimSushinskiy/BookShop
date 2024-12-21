using BookShop.DAL.Models.Entities;
using BookShop.DAL.Models.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Globalization;

namespace BookShop.DAL
{
    public class SqlServerContext : DbContext
    {
        public SqlServerContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private readonly IConfiguration _configuration;

        public virtual DbSet<Author> Authors { get; set; }

        public virtual DbSet<Book> Books { get; set; }

        public virtual DbSet<Cart> Carts { get; set; }

        public virtual DbSet<Order> Orders { get; set; }

        public virtual DbSet<OrderStatus> OrderStatuses { get; set; }

        public virtual DbSet<Publishing> Publishings { get; set; }

        public virtual DbSet<Review> Reviews { get; set; }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<Image> Images { get; set; }

        public virtual DbSet<ViewUser> ViewUsers { get; set; }

        public virtual DbSet<ViewBook> ViewBook { get; set; }

        public virtual DbSet<ViewAuthor> ViewAuthor { get; set; }

        public virtual DbSet<ViewPublishing> ViewPublishing { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("SqlServer"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasOne(d => d.Author).WithMany(p => p.Books).HasForeignKey(d => d.AuthorId);

                entity.HasOne(d => d.Publishing).WithMany(p => p.Books).HasForeignKey(d => d.PublishingId);

                entity.Property(e => e.Rating).HasDefaultValue(0);
                entity.Property(e => e.RatingNumber).HasDefaultValue(0);
                entity.Property(e => e.CoverType).HasDefaultValue("Тверда");
                entity.Property(e => e.PublicationYear).HasDefaultValue(2024);
                entity.Property(e => e.SoldNum).HasDefaultValue(0);
                entity.Property(e => e.Count).HasDefaultValue(30);

            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasOne(d => d.Book).WithMany(p => p.Orders).HasForeignKey(d => d.BookId);

                entity.HasOne(d => d.Cart).WithMany(p => p.Orders).HasForeignKey(d => d.CartId);
            });

            modelBuilder.Entity<OrderStatus>(entity =>
            {
                entity.HasOne(d => d.User).WithMany(p => p.Orders).HasForeignKey(d => d.UserId);

                entity.Property(e => e.Phone).HasDefaultValue("+380974863665");
                entity.Property(e => e.Email).HasDefaultValue("admin@gmail.com");
                entity.Property(e => e.DeliveryType).HasDefaultValue("Нова Пошта");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasOne(d => d.Book).WithMany(p => p.Reviews).HasForeignKey(d => d.BookId);

                entity.HasOne(d => d.User).WithMany(p => p.Reviews).HasForeignKey(d => d.UserId);

                entity.Property(e => e.WritingDate).HasDefaultValue(new DateTime(2024, 12, 17).ToString("dd MMMM yyyy", CultureInfo.CreateSpecificCulture("uk")));
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasOne(d => d.Cart).WithOne(p => p.User).HasForeignKey<User>(d => d.CartId);
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.HasOne(d => d.Book).WithMany(p => p.Images).HasForeignKey(d => d.BookId);
            });

            modelBuilder.Entity<ViewUser>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("View_Users");
            });

            modelBuilder.Entity<ViewBook>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("Book_View");
            });

            modelBuilder.Entity<ViewAuthor>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("Author_View");
            });

            modelBuilder.Entity<ViewPublishing>(entity =>
            {
                entity.HasNoKey();
                entity.ToView("Publishing_View");
            });
        }


    }
}
