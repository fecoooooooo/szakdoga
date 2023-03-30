using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Registry_Backend.Models;

namespace Registry_Backend.Controllers
{
	public class UsersController : ControllerBase
	{
		private readonly RegistryContext dbContext;
		private readonly AspNetUserManager<IdentityUser> aspNetUserManager;

		public UsersController(RegistryContext dbContext, AspNetUserManager<IdentityUser> aspNetUserManager)
		{
			this.dbContext = dbContext;
			this.aspNetUserManager = aspNetUserManager;
		}

		[HttpGet("AllUsers")]
		[ProducesResponseType(typeof(List<IdentityUser>), StatusCodes.Status200OK)]
		public IActionResult GetSamples()
		{
			var result = dbContext.AspNetUsers.ToList();
			if (result != null)
				return Ok(result);

			return NotFound("No rows in table");
		}
	}
}
