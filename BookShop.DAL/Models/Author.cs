namespace BookShop.DAL.Models;

public partial class Author
{
    public int Id { get; set; }

    public string Fullname { get; set; } = null!;

    public string Country { get; set; } = null!;

    public virtual ICollection<Book> Books { get; set; } = new List<Book>();
}
