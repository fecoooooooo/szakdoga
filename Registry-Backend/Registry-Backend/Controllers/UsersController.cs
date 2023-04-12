using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Registry_Backend.DTO;
using Registry_Backend.Models;

namespace Registry_Backend.Controllers
{
	[ApiController, Authorize(Roles = "Adminisztrátor,Ügyvezető,HR Vezető")]
	[Route("api/[controller]")]
	public class UsersController : ControllerBase
	{
		private readonly RegistryContext dbContext;
		private readonly UserManager<IdentityUser> userManager;
		private readonly RoleManager<IdentityRole> roleManager;

		public UsersController(RegistryContext dbContext, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
		{
			this.dbContext = dbContext;
			this.userManager = userManager;
			this.roleManager = roleManager;
		}

		[HttpGet("AllUsers")]
		[ProducesResponseType(typeof(List<IdentityUser>), StatusCodes.Status200OK)]
		public IActionResult GetAllUsers()
		{
			var result = userManager.Users.ToList();
			if (result != null)
				return Ok(result);

			return NotFound("No rows in table");
		}


		[HttpGet("Single/{id}")]
		[ProducesResponseType(typeof(UserResponse), StatusCodes.Status200OK)]
		public async Task<IActionResult> GetUserById([FromRoute] string id)
		{
			var user = await userManager.FindByIdAsync(id);
			
			if (user != null)
			{
				var role = (await userManager.GetRolesAsync(user)).FirstOrDefault();

				return Ok(new UserResponse()
				{
					User = user,
					Role = role
				});
			}

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
		public async Task<IActionResult> UpdateUser([FromRoute] string userId, [FromBody] UserRequest userRequest)
		{
			var userToUpdate = await userManager.FindByIdAsync(userId);

			if (userToUpdate != null)
			{
				userToUpdate.UserName = userRequest.UserName;
				userToUpdate.Email = userRequest.Email;
				userToUpdate.PhoneNumber = userRequest.PhoneNumber;
				userToUpdate.NormalizedUserName = userRequest.UserName.ToUpper();
				userToUpdate.NormalizedEmail = userRequest.Email.ToUpper();

				var userRoles = await userManager.GetRolesAsync(userToUpdate);

				if (false == userRoles.Contains(userRequest.Role))
				{
					foreach (var r in userRoles) 
						await userManager.RemoveFromRoleAsync(userToUpdate, r);

					var result = await userManager.AddToRoleAsync(userToUpdate, userRequest.Role);

					if (!result.Succeeded)
						throw new ApplicationException(result.Errors.FirstOrDefault()?.Description);
				}

				dbContext.SaveChanges();

				var ph = userManager.PasswordHasher.HashPassword(userToUpdate, userRequest.Password);
				userToUpdate.PasswordHash = ph;

				return Ok("OK");
			}

			return NotFound($"No software with id: {userId}");
		}

		[HttpPost("AddUser")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public async Task<IActionResult> AddUser([FromBody] UserRequest userRequest)
		{
			var identityUser = new IdentityUser
			{
				UserName = userRequest.UserName,
				NormalizedUserName = userRequest.UserName.ToUpper(),
				Email = userRequest.Email,
				NormalizedEmail = userRequest.Email.ToUpper(),
				EmailConfirmed = true,
				PasswordHash = null,
				SecurityStamp = null,
				ConcurrencyStamp = null,
				PhoneNumber = userRequest.PhoneNumber,
				PhoneNumberConfirmed = true,
				TwoFactorEnabled = false,
				LockoutEnd = null,
				LockoutEnabled = false,
				AccessFailedCount = 10,
			};

			var ph = userManager.PasswordHasher.HashPassword(identityUser, userRequest.Password);
			identityUser.PasswordHash = ph;

			var resp = await userManager.CreateAsync(identityUser);

			if (resp.Succeeded)
			{
				var userRole = await roleManager.FindByNameAsync(userRequest.Role);
				if (userRole == null)
					throw new ApplicationException("Role not found.");

				var result = await userManager.AddToRoleAsync(identityUser, userRequest.Role);
				if (!result.Succeeded)
					throw new ApplicationException(result.Errors.FirstOrDefault()?.Description);

				return Ok("OK");
			}

			else throw new ApplicationException(resp.Errors.FirstOrDefault()?.Description);
		}

		[HttpGet("GetAllRoles")]
		[ProducesResponseType(typeof(List<IdentityRole>), StatusCodes.Status200OK)]
		public IActionResult GetAllRoles()
		{
			var result = roleManager.Roles.ToList();
			if (result != null)
				return Ok(result);

			return NotFound("No rows in table");
		}
	}
}
