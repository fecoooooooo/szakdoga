namespace Registry_Backend.DTO
{
	public class DevicesForUserResponse
	{
		public string? UserName { get; set; } = null!;
		public string? DeviceName { get; set; } = null!;
		public DateTime StartDate { get; set; }

	}
}
