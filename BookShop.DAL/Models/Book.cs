namespace BookShop.DAL.Models;

public class Book
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Price { get; set; }

    public string Genre { get; set; } = null!;

    public int Volume { get; set; }

    public string Language { get; set; } = null!;

    public float Rating { get; set; } = 0;

    public int RatingNumber { get; set; } = 0;

    public int AuthorId { get; set; }

    public int PublishingId { get; set; }

    public Author Author { get; set; } = null!;

    public Publishing Publishing { get; set; } = null!;

    public ICollection<Order> Orders { get; set; } = new List<Order>();

    public ICollection<Review> Reviews { get; set; } = new List<Review>();

    public ICollection<Image> Images { get; set; } = new List<Image>();
}
