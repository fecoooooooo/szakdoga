using System;
using System.Collections.Generic;

namespace Registry_Backend.Models;

public partial class Device
{
    public int Id { get; set; }

    public string SerialNumber { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Price { get; set; }

    public string? Link { get; set; }

    public string? UserId { get; set; }

    public bool IsActive { get; set; }

    public virtual AspNetUser? User { get; set; }
}
