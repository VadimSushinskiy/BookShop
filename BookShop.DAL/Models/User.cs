﻿namespace BookShop.DAL.Models;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Role { get; set; } = null!;

    public string CartId { get; set; }

    public virtual Cart Cart { get; set; } = null!;

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<OrderStatus> Orders { get; set; } = new List<OrderStatus>();
}
