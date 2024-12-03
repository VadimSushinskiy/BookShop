
namespace BookShop.DAL.Models
{
    public class PublishingDAL
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Country { get; set; } = null!;
        public List<BookDAL> Books { get; set; } = null!;
    }
}
