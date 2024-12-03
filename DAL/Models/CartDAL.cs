
namespace BookShop.DAL.Models
{
    public class CartDAL
    {
        public int Id { get; set; }
        public decimal TotalPrice { get; set; }
        public List<OrderDAL> Orders { get; set; } = null!;
        public int? UserId { get; set; }
        public UserDAL? User { get; set; }
    }
}
