using BookShop.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BookShop.DAL
{
    public class SqlServerContext : DbContext
    {
        public SqlServerContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private readonly IConfiguration _configuration;
        public DbSet<BookDAL> Books { get; set; } = null!;
        public DbSet<AuthorDAL> Authors { get; set; } = null!;
        public DbSet<PublishingDAL> Publishings { get; set; } = null!;
        public DbSet<ReviewDAL> Reviews { get; set; } = null!;
        public DbSet<UserDAL> Users { get; set; } = null!;
        public DbSet<CartDAL> Carts { get; set; } = null!;
        public DbSet<OrderDAL> Orders { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("SqlServer"));
        }
    }
}
