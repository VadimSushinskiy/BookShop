namespace BookShop.Shared.DTO
{
    public class OrderStatusDTO
    {
        public int Id { get; set; }

        public decimal TotalPrice { get; set; }

        public string Status { get; set; } = null!;

        public DateTime CreatedDate { get; set; }
    }
}
