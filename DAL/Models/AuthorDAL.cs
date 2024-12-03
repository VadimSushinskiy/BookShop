
namespace BookShop.DAL.Models
{
    public class AuthorDAL
    {
        public int Id { get; set; }
        public string Fullname { get; set; } = null!;
        public string Country { get; set; } = null!;
        public List<BookDAL> Books { get; set; } = null!;
    }
}
