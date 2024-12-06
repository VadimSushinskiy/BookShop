namespace BookShop.Shared.DTO
{
    public class CartDTO
    {
        public string Id { get; set; }

        public decimal TotalPrice { get; set; }

        public IEnumerable<OrderDTO> Orders { get; set; }
    }
}
