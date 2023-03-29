using Microsoft.AspNetCore.Mvc;
using Registry_Backend.Models;
using System.Net;

namespace Registry_Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class DevicesController : ControllerBase
	{
		private readonly RegistryContext dbContext;

		public DevicesController(RegistryContext dbContext)
		{
			this.dbContext = dbContext;
		}

		[HttpGet("AllDevices")]
		[ProducesResponseType(typeof(List<Device>), StatusCodes.Status200OK)]
		public IActionResult GetSamples()
		{
			var result = dbContext.Devices.ToList();
			if (result != null)
				return Ok(result);

			return Ok("No rows in table");
		}

		[HttpGet("Device/{id}")]
		[ProducesResponseType(typeof(Device), StatusCodes.Status200OK)]
		public IActionResult GetDeviceById([FromRoute] int id)
		{
			var result = dbContext.Devices.Where(x => x.Id == id).FirstOrDefault();
			if (result != null)
				return Ok(result);

			return Ok($"No device with id: {id}");
		}
	}
}
