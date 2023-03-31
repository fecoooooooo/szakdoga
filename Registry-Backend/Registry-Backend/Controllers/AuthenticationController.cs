using Microsoft.AspNetCore.Mvc;
using Registry_Backend.Models;
using System.Net;

namespace Registry_Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthenticationController : ControllerBase
	{
		private readonly RegistryContext dbContext;

		public AuthenticationController(RegistryContext dbContext)
		{
			this.dbContext = dbContext;
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
			return BadRequest("400");
		}

		[HttpGet("DEBUG_Example500")]
		public IActionResult Example500()
		{
			throw new Exception("500");
		}
	}
}
