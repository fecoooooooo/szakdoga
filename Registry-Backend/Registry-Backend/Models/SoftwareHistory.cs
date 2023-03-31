using System;
using System.Collections.Generic;

namespace Registry_Backend.Models;

public partial class SoftwareHistory
{
    public int Id { get; set; }

    public string UserId { get; set; } = null!;

    public int SoftwareId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }
}
