namespace BookShop.Shared.DTO
{
    public class FilterDTO
    {
        public string Name { get; set; }

        public decimal MinPrice { get; set; }

        public decimal MaxPrice { get; set; }

        public string Genre { get; set; }
        public string Language { get; set; }
        public string AuthorName { get; set; }
    }
}
