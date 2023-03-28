using System;
using System.Collections.Generic;

namespace Registry_Backend.Models;

public partial class Sample
{
    public int Id { get; set; }

    public string? Key { get; set; }

    public string? Name { get; set; }

    public long? Something { get; set; }
}
