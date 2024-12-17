namespace BookShop.Shared.DTO
{
    public class ViewUserDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public decimal Total { get; set; }

        public int OrderCount { get; set; }
    }
}
