using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

			return NotFound("No rows in table");
		}

		[HttpGet("Single/{id}")]
		[ProducesResponseType(typeof(Device), StatusCodes.Status200OK)]
		public IActionResult GetDeviceById([FromRoute] int id)
		{
			var device = dbContext.Devices.Where(x => x.Id == id).FirstOrDefault();
			if (device != null)
				return Ok(device);

			return NotFound($"No device with id: {id}");
		}

		[HttpDelete("Delete/{id}")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult DeleteDevice(int id)
		{
			var device = dbContext.Devices.Where(x => x.Id == id).FirstOrDefault();
			if (device != null)
			{
				dbContext.Devices.Remove(device);
				dbContext.SaveChanges();
				return Ok("OK");
			}

			return NotFound($"No device with id: {id}");
		}


		[HttpPatch("UpdateDevice")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult UpdateDevice([FromBody] Device device)
		{
			var oldDevice = dbContext.Devices.Where(x => x.Id == device.Id).FirstOrDefault();
			if (oldDevice != null)
			{
				oldDevice.SerialNumber = device.SerialNumber;
				oldDevice.Name = device.Name;
				oldDevice.Description = device.Description;
				oldDevice.Price = device.Price;
				oldDevice.Link = device.Link;
				oldDevice.UserId = device.UserId;
				oldDevice.IsActive = device.IsActive;

				dbContext.Devices.Update(oldDevice);
				dbContext.SaveChanges();
			
				return Ok("OK");
			}

			return NotFound($"No device with id: {device.Id}");
		}

		[HttpPost("AddDevice")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult AddDevice([FromBody] Device device)
		{
			int maxId = dbContext.Devices.Max(x => x.Id);

			device.Id = maxId + 1;
			dbContext.Devices.Add(device);
			dbContext.SaveChanges();

			return Ok("OK");
		}
	}
}
