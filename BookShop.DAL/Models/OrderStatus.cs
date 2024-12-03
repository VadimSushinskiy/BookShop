namespace BookShop.DAL.Models
{
    public class OrderStatus
    {
        public int Id { get; set; }

        public decimal TotalPrice { get; set; }

        public string Status { get; set; } = null!;

        public DateTime CreatedDate { get; set; }

        public int? UserId { get; set; }

        public User? User { get; set; }
    }
}
