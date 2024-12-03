namespace BookShop.DAL.Models
{
    public class BookDAL
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public decimal Price { get; set; }
        public string Genre { get; set; } = null!;
        public int Volume { get; set; }
        public string Language { get; set; } = null!;
        public int AutorId { get; set; }
        public AuthorDAL Author { get; set; } = null!;
        public int PublishingId { get; set; }
        public PublishingDAL Publishing { get; set; } = null!;
        public List<ReviewDAL> Reviews { get; set; } = null!;
        public List<OrderDAL> Orders { get; set; } = null!;
    }
}
