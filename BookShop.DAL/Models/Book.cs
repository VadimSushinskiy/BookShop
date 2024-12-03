namespace BookShop.DAL.Models;

public partial class Book
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Price { get; set; }

    public string Genre { get; set; } = null!;

    public int Volume { get; set; }

    public string Language { get; set; } = null!;

    public int AuthorId { get; set; }

    public int PublishingId { get; set; }

    public virtual Author Author { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual Publishing Publishing { get; set; } = null!;

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
