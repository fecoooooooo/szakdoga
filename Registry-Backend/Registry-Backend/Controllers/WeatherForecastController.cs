using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Registry_Backend.Models;
using System.Net;

namespace Registry_Backend.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class WeatherForecastController : ControllerBase
	{
		private readonly RegistryContext dbContext;

		public WeatherForecastController(RegistryContext dbContext)
		{
			this.dbContext = dbContext;
		}

		[HttpGet("GetSampleData")]
		[ProducesResponseType(typeof(List<Sample>), StatusCodes.Status200OK)]
		public IActionResult GetSamples()
		{
			using (var client = new WebClient())
			{
				client.DownloadFile("https://localhost:44301/swagger/v1/swagger.json", "..\\..\\registry\\swagger\\swagger.json");
			}

			var result = dbContext.Samples.ToList();
			if (result != null)
				return Ok(result);

			return Ok("No rows in Sample table");
		}
	}
}