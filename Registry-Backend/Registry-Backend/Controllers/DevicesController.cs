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

			return Ok("No rows in table");
		}

		[HttpGet("Single/{id}")]
		[ProducesResponseType(typeof(Device), StatusCodes.Status200OK)]
		public IActionResult GetDeviceById([FromRoute] int id)
		{
			var device = dbContext.Devices.Where(x => x.Id == id).FirstOrDefault();
			if (device != null)
				return Ok(device);

			return Ok($"No device with id: {id}");
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

			return Ok($"No device with id: {id}");
		}


		[HttpPatch("UpdateDevice")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult UpdateDevice([FromBody] Device newDeviceData)
		{
			var device = dbContext.Devices.Where(x => x.Id == newDeviceData.Id).FirstOrDefault();
			if (device != null)
			{
				device.SerialNumber = newDeviceData.SerialNumber;
				device.Name = newDeviceData.Name;
				device.Description = newDeviceData.Description;
				device.Price = newDeviceData.Price;
				device.Link = newDeviceData.Link;
				device.UserId = newDeviceData.UserId;
				device.IsActive = newDeviceData.IsActive;

				dbContext.Devices.Update(device);
				dbContext.SaveChanges();
			
				return Ok("OK");
			}

			return Ok($"No device with id: {newDeviceData.Id}");
		}

		[HttpPost("AddDevice")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult AddDevice([FromBody] Device newDevice)
		{
			int maxId = dbContext.Devices.Max(x => x.Id);

			newDevice.Id = maxId + 1;
			dbContext.Devices.Add(newDevice);
			dbContext.SaveChanges();

			return Ok("OK");
		}
	}
}
