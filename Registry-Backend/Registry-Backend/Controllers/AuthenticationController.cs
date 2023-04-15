using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Registry_Backend.DTO;
using Registry_Backend.Models;
using Registry_Backend.Shared;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Registry_Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthenticationController : ControllerBase
	{
		private readonly SignInManager<IdentityUser> signInManager;
		private readonly RegistryContext dbContext;
		private readonly UserManager<IdentityUser> userManager;
		private readonly RoleManager<IdentityRole> roleManager;
		private readonly IHttpContextAccessor httpContextAccessor;

		public AuthenticationController(RegistryContext dbContext, SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IHttpContextAccessor httpContextAccessor)
		{
			this.dbContext = dbContext;
			this.signInManager = signInManager;
			this.userManager = userManager;
			this.roleManager = roleManager;
			this.httpContextAccessor = httpContextAccessor;
		}

		[HttpPost("Login")]
		[ProducesResponseType(typeof(JWTTokenResponse), StatusCodes.Status200OK)]
		public async Task<IActionResult> LoginAsync([FromBody] LoginData loginData)
		{
			if (loginData is null)
			{
				throw new AppException("Invalid user request!!!");
			}
			else
			{
				var result = await signInManager.PasswordSignInAsync(loginData.UserName, loginData.Password, false, false);

				if (result.Succeeded)
				{
					var user = await userManager.FindByNameAsync(loginData.UserName);
					if (user != null) {

						var role = (await userManager.GetRolesAsync(user)).FirstOrDefault();
						if (role != null) {

							var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManagerExtension.AppSetting["JWT:Secret"]));
							var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
							var tokeOptions = new JwtSecurityToken(
								issuer: ConfigurationManagerExtension.AppSetting["JWT:ValidIssuer"],
								audience: ConfigurationManagerExtension.AppSetting["JWT:ValidAudience"], 
								claims: new List<Claim>() { new Claim(ClaimTypes.Role, role) },
								expires: DateTime.Now.AddDays(100),
								signingCredentials: signinCredentials);
							var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
							return Ok(new JWTTokenResponse
							{
								Token = tokenString,
								UserId = user.Id,
								Role = role
							});
						}
					}
				}
			}

			return Unauthorized();
		}

		[HttpPost("Logout")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public async Task<IActionResult> LogoutAsync()
		{
			await signInManager.SignOutAsync();
			return Ok("OK");
		}

		[HttpGet("IsLoggedIn")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult IsLoggedIn()
		{
			if (User.Identity != null)
			{
				return Ok(User.Identity.IsAuthenticated);
			}

			return Ok(false);
		}
	}
}
