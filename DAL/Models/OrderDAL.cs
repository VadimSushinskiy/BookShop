
namespace BookShop.DAL.Models
{
    public class OrderDAL
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public BookDAL Book { get; set; } = null!;
        public int CartId { get; set; }
        public CartDAL Cart { get; set; } = null!;
    }
}
