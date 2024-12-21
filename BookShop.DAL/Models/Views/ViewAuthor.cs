namespace BookShop.DAL.Models.Views
{
    public class ViewAuthor
    {
        public int Id { get; set; }

        public string Fullname { get; set; }

        public int TotalBooks { get; set; }

        public int TotalCountSold { get; set; }

        public decimal TotalSold { get; set; }
    }
}
