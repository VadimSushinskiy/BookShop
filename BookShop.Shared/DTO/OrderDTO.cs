namespace BookShop.Shared.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }

        public int Count { get; set; }

        public BookDTO Book { get; set; }
    }
}
