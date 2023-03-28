using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Registry_Backend.Models;

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
			try
			{
				var result = dbContext.Samples.ToList();
				if (result != null)
					return Ok(result);
				
				return Ok("No rows in Sample table");

			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}