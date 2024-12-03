namespace BookShop.Shared.DTO
{
    public class BookDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public decimal Price { get; set; }

        public string Genre { get; set; } = null!;

        public int Volume { get; set; }

        public string Language { get; set; } = null!;

        public string AuthorName { get; set; } = null!;

        public string PublishingName { get; set; } = null!;
    }
}
