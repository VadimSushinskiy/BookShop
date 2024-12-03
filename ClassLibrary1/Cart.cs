
namespace ClassLibrary1;

public partial class Cart
{
    public int Id { get; set; }

    public decimal TotalPrice { get; set; }

    public int? UserId { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User? User { get; set; }
}
