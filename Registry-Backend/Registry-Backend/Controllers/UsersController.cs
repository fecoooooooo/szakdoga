using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Registry_Backend.DTO;
using Registry_Backend.Models;

namespace Registry_Backend.Controllers
{
	[ApiController, /*TODO Authorize*/]
	[Route("api/[controller]")]
	public class UsersController : ControllerBase
	{
		private readonly RegistryContext dbContext;
		private readonly UserManager<IdentityUser> userManager;

		public UsersController(RegistryContext dbContext, UserManager<IdentityUser> userManager)
		{
			this.dbContext = dbContext;
			this.userManager = userManager;
		}

		[HttpGet("AllUsers")]
		[ProducesResponseType(typeof(List<IdentityUser>), StatusCodes.Status200OK)]
		public IActionResult GetAllUSers()
		{
			var result = userManager.Users.ToList();
			if (result != null)
				return Ok(result);

			return NotFound("No rows in table");
		}


		[HttpGet("Single/{id}")]
		[ProducesResponseType(typeof(IdentityUser), StatusCodes.Status200OK)]
		public async Task<IActionResult> GetUserById([FromRoute] string id)
		{
			var user = await userManager.FindByIdAsync(id);
			if (user != null)
				return Ok(user);

			return NotFound($"No User with id: {id}");
		}

		[HttpDelete("Delete/{id}")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public async Task<IActionResult> DeleteUser(string id)
		{
			var user = await userManager.FindByIdAsync(id);
			if (user != null)
			{
				var result = await userManager.DeleteAsync(user);
				if (result.Succeeded)
					return Ok("Ok");
				else
					throw new Exception("500");
			}

			return NotFound($"No User with id: {id}");
		}

		
		[HttpPatch("UpdateUser/{userId}")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public async Task<IActionResult> UpdateUser([FromRoute] string userId, [FromBody] UserRequest user)
		{
			var userToUpdate = await userManager.FindByIdAsync(userId);

			if (userToUpdate != null)
			{
				userToUpdate.UserName = user.UserName;
				userToUpdate.Email = user.Email;
				userToUpdate.PhoneNumber = user.PhoneNumber;
				userToUpdate.NormalizedUserName = user.UserName.ToUpper();
				userToUpdate.NormalizedEmail = user.Email.ToUpper();

				dbContext.SaveChanges();

				var ph = userManager.PasswordHasher.HashPassword(userToUpdate, user.Password);
				userToUpdate.PasswordHash = ph;

				return Ok("OK");
			}

			return NotFound($"No software with id: {userId}");
		}

		[HttpPost("AddUser")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public async Task<IActionResult> AddUser([FromBody] UserRequest user)
		{
			var identityUser = new IdentityUser
			{
				UserName = user.UserName,
				NormalizedUserName = user.UserName.ToUpper(),
				Email = user.Email,
				NormalizedEmail = user.Email.ToUpper(),
				EmailConfirmed = true,
				PasswordHash = null,
				SecurityStamp = null,
				ConcurrencyStamp = null,
				PhoneNumber = user.PhoneNumber,
				PhoneNumberConfirmed = true,
				TwoFactorEnabled = false,
				LockoutEnd = null,
				LockoutEnabled = false,
				AccessFailedCount = 10
			};

			var ph = userManager.PasswordHasher.HashPassword(identityUser, user.Password);
			identityUser.PasswordHash = ph;

			var resp = await userManager.CreateAsync(identityUser);

			if (resp.Succeeded)
				return Ok("OK");

			else throw new ApplicationException(resp.Errors.FirstOrDefault()?.Description);
		}
	}
}
