
namespace BookShop.DAL.Models
{
    public class ReviewDAL
    {
        public int Id { get; set; }
        public string Text { get; set; } = null!;
        public int Rating { get; set; }
        public int BookId { get; set; }
        public BookDAL Book { get; set; } = null!;
        public int UserId {  get; set; }
        public UserDAL User { get; set; } = null!;
    }
}
