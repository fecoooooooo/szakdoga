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

		[HttpGet("GenerateSwaggerJson")]
		[ProducesResponseType(typeof(List<Sample>), StatusCodes.Status200OK)]
		public IActionResult GetSamples()
		{
			using (var client = new WebClient())
			{
				client.DownloadFile("https://localhost:44301/swagger/v1/swagger.json", "..\\..\\registry\\swagger\\swagger.json");
			}

			return Ok("OK");
		}
	}
}
