namespace BookShop.Shared.DTO
{
    public class OrderStatusDTO
    {
        public int? Id { get; set; }

        public decimal? TotalPrice { get; set; }

        public string Status { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string DeliveryType { get; set; }
    }
}
