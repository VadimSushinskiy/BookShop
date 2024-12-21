namespace BookShop.DAL.Models.Entities;

public class Cart
{
    public string Id { get; set; }

    public decimal TotalPrice { get; set; }

    public int? UserId { get; set; }

    public virtual User? User { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
