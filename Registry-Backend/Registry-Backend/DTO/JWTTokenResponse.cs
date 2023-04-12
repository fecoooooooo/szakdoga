namespace Registry_Backend.DTO
{
	public class JWTTokenResponse
	{
		public string? Token { get; set; }
		public string? UserId { get; set; }
		public string? Role { get; set; }
	}
}
