
namespace BookShop.DAL.Models
{
    public class UserDAL
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;
        public int CartId { get; set; }
        public CartDAL Cart { get; set; } = null!;
        public List<ReviewDAL> Reviews { get; set; } = null!;
    }
}
