namespace BookShop.Shared.DTO
{
    public class ViewPublishingDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int TotalBooks { get; set; }

        public int TotalCountSold { get; set; }

        public decimal TotalSold { get; set; }
    }
}
