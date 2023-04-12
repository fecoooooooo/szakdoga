using Microsoft.AspNetCore.Identity;

namespace Registry_Backend.DTO
{
    public class UserResponse
    {
        public IdentityUser User { get; set; } = null!;
		public string? Role { get; set; }
	}
}
