namespace BookShop.DAL.Models.Views
{
    public class ViewPublishing
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int TotalBooks { get; set; }

        public int TotalCountSold { get; set; }

        public decimal TotalSold { get; set; }
    }
}
