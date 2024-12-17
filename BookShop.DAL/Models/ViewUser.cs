namespace BookShop.DAL.Models
{
    public class ViewUser
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public decimal Total { get; set; }

        public int OrderCount { get; set; }
    }
}
