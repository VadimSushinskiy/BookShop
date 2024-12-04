namespace BookShop.Shared.DTO
{
    public class CartDTO
    {
        public int Id { get; set; }

        public decimal TotalPrice { get; set; }

        public IEnumerable<OrderDTO> Orders { get; set; } = null!;
    }
}
