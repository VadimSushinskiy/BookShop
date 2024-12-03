namespace BookShop.DAL.Models;

public partial class Order
{
    public int Id { get; set; }

    public int BookId { get; set; }

    public int CartId { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual Cart Cart { get; set; } = null!;
}
