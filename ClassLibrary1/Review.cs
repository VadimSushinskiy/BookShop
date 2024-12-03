using System;
using System.Collections.Generic;

namespace ClassLibrary1;

public partial class Review
{
    public int Id { get; set; }

    public string Text { get; set; } = null!;

    public int Rating { get; set; }

    public int BookId { get; set; }

    public int UserId { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
