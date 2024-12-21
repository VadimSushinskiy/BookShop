namespace BookShop.Shared.DTO
{
    public class ViewBookDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string AuthorName { get; set; }

        public string PublishingName { get; set; }

        public int Count { get; set; }

        public decimal Price { get; set; }

        public int SoldNum { get; set; }

        public decimal TotalSold { get; set; }
    }
}
