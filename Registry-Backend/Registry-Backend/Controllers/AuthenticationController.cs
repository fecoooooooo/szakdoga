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

		public AuthenticationController(RegistryContext dbContext, SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
		{
			this.dbContext = dbContext;
			this.signInManager = signInManager;
			this.userManager = userManager;
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
					var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManagerExtension.AppSetting["JWT:Secret"]));
					var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
					var tokeOptions = new JwtSecurityToken(
						issuer: ConfigurationManagerExtension.AppSetting["JWT:ValidIssuer"],
						audience: ConfigurationManagerExtension.AppSetting["JWT:ValidAudience"], claims: new List<Claim>(),
						expires: DateTime.Now.AddMinutes(6),
						signingCredentials: signinCredentials);
					var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
					return Ok(new JWTTokenResponse
					{
						Token = tokenString
					});
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
		public async Task<IActionResult> IsLoggedIn([FromQuery] string userId)
		{
			var user = await userManager.FindByIdAsync(userId);
			if(user != null)
			{
				var claims = await signInManager.CreateUserPrincipalAsync(user);
				return Ok(signInManager.IsSignedIn(claims));
			}

			return Ok(false);
		}
	}
}
