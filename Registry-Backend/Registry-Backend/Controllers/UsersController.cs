using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Registry_Backend.DTO;
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


		[HttpGet("Single/{id}")]
		[ProducesResponseType(typeof(IdentityUser), StatusCodes.Status200OK)]
		public async Task<IActionResult> GetUserById([FromRoute] string id)
		{
			var user = await aspNetUserManager.FindByIdAsync(id);
			if (user != null)
				return Ok(user);

			return NotFound($"No User with id: {id}");
		}

		[HttpDelete("Delete/{id}")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public async Task<IActionResult> DeleteUser(string id)
		{
			var user = await aspNetUserManager.FindByIdAsync(id);
			if (user != null)
			{
				var result = await aspNetUserManager.DeleteAsync(user);
				if (result.Succeeded)
					return Ok("Ok");
				else
					throw new Exception("500");
			}

			return NotFound($"No User with id: {id}");
		}

		/*
		[HttpPatch("UpdateUser")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult UpdateSoftware([FromBody] AspNetUser user)
		{
			var oldUser = dbContext.AspNetUsers.Where(x => x.Id == user.Id).FirstOrDefault();

			if (oldUser != null)
			{
				oldUser.UserName = user.UserName;
				oldUser.Email = user.Email;
				oldUser.PasswordHash = user.PasswordHash;
				oldUser.Price = user.Price;
				oldUser.ProductLink = user.ProductLink;
				oldUser.UserId = user.UserId;
				oldUser.IsActive = user.IsActive;

				dbContext.Softwares.Update(oldUser);
				dbContext.SaveChanges();

				return Ok("OK");
			}

			return NotFound($"No software with id: {user.Id}");
		}*/

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
				EmailConfirmed = false,
				PasswordHash = null,
				SecurityStamp = null,
				ConcurrencyStamp = null,
				PhoneNumber = user.PhoneNumber,
				PhoneNumberConfirmed = false,
				TwoFactorEnabled = false,
				LockoutEnd = null,
				LockoutEnabled = false,
				AccessFailedCount = 0
			};

			var ph = aspNetUserManager.PasswordHasher.HashPassword(identityUser, user.Password);
			identityUser.PasswordHash = ph;

			var resp = await aspNetUserManager.CreateAsync(identityUser);

			if (resp.Succeeded)
				Ok("OK");
			
			throw new Exception("500");
		}
	}
}
