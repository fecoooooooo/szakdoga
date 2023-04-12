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
		public async Task<IActionResult> LoginAsync([FromBody] LoginData loginData)
		{
			//var result = await signInManager.PasswordSignInAsync(loginData.UserName, loginData.Password, false, false);
			var result = await signInManager.PasswordSignInAsync(loginData.UserName, loginData.Password, false, false);

			if(result.Succeeded) 
			{

			}


			if (loginData is null)
			{
				throw new AppException("Invalid user request!!!");
			}
			if (true || loginData.UserName == "string" && loginData.Password == "string")
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
			return Unauthorized();
		}

		[HttpGet("DEBUG_GenerateSwaggerJson")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult GetSamples()
		{
			using (var client = new WebClient())
			{
				client.DownloadFile("https://localhost:44301/swagger/v1/swagger.json", "..\\..\\registry\\swagger\\swagger.json");
			}

			return Ok("OK");
		}

		[HttpGet("DEBUG_Example400")]
		public IActionResult Example400()
		{
			throw new AppException("400");
		}

		[HttpGet("DEBUG_Example500")]
		public IActionResult Example500()
		{
			throw new Exception("500");
		}
	}
}
