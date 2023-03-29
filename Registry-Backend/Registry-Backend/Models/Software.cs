using System;
using System.Collections.Generic;

namespace Registry_Backend.Models;

public partial class Software
{
    public int Id { get; set; }

    public string License { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Price { get; set; }

    public string? ProductLink { get; set; }

    public string? UserId { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<SoftwareHistory> SoftwareHistories { get; } = new List<SoftwareHistory>();

    public virtual AspNetUser? User { get; set; }
}
