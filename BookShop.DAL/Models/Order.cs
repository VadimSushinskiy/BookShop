namespace BookShop.DAL.Models;

public class Order
{
    public int Id { get; set; }

    public int Count { get; set; }

    public int BookId { get; set; }

    public string CartId { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual Cart Cart { get; set; } = null!;
}
