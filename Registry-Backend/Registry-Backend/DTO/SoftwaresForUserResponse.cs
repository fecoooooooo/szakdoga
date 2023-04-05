namespace Registry_Backend.DTO
{
	public class SoftwaresForUserResponse
	{
		public string? UserName { get; set; } = null!;
		public string? SoftwareName { get; set; } = null!;
		public DateTime StartDate { get; set; }

	}
}
