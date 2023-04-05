using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Registry_Backend.DTO;
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
			var result = dbContext.Devices.Add(device);
			dbContext.SaveChanges();

			return Ok(result.Entity.Id);
		}


		[HttpGet("HistoryForDevice/{id}")]
		[ProducesResponseType(typeof(List<DeviceHistory>), StatusCodes.Status200OK)]
		public IActionResult GetHistoryForDeviceById([FromRoute] int id)
		{
			var histories = dbContext.DeviceHistories
				.Where(x => x.DeviceId == id)
				.OrderBy(x => x.StartDate).ToList();

			if (histories != null)
				return Ok(histories);

			return NotFound($"No device with id: {id}");
		}

		[HttpGet("DevicesForUser/{userId}")]
		[ProducesResponseType(typeof(List<DevicesForUserResponse>), StatusCodes.Status200OK)]
		public IActionResult GetHistoryForUserById([FromRoute] string userId)
		{
			var histories = dbContext.DeviceHistories
				.Where(x => x.UserId == userId)
				.Where(x => x.EndDate == null).ToList();

			var user = dbContext.AspNetUsers.Where(x => x.Id == userId).FirstOrDefault();
			if(user == null)
				return NotFound($"No user with id: {userId}");

			List<DevicesForUserResponse> response = new List<DevicesForUserResponse>();
			if (histories != null)
			{
				foreach(var h in histories)
				{
					response.Add(new DevicesForUserResponse()
					{
						UserName = dbContext.AspNetUsers.Where(x => x.Id == userId).FirstOrDefault()?.UserName,
						DeviceName = dbContext.Devices.Where(x => x.Id == h.DeviceId).FirstOrDefault()?.Name,
						StartDate = h.StartDate
					});
				}
			}
			return Ok(response);
		}

		[HttpPost("AddHistoryEntry")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult AddHistoryEntry([FromQuery] int deviceId, [FromQuery] string? userId, [FromQuery] bool startAssignment)
		{
			var device = dbContext.Devices.Where(x => x.Id == deviceId).FirstOrDefault();
			if(device == null)
				return NotFound($"No device with id: {deviceId}");

			var user = dbContext.AspNetUsers.Where(x => x.Id == userId);
			if (user == null)
				return NotFound($"No user with id: {userId}");

			var allHistory = dbContext.DeviceHistories.ToList();

			var currentyHistory = dbContext.DeviceHistories
				.Where(x => x.EndDate == null)
				.Where(x => x.DeviceId == deviceId).FirstOrDefault();

			if (startAssignment)
			{
				if (currentyHistory != null)
				{
					bool alreadyAssignedToThisUser = currentyHistory.UserId == userId;
					if (alreadyAssignedToThisUser)
						return Ok("Nothing to do, already assigned");

					bool assignedToSomeoneElse = currentyHistory.UserId != userId;
					if (assignedToSomeoneElse)
					{
						currentyHistory.EndDate = DateTime.Now;
						dbContext.DeviceHistories.Update(currentyHistory);
					}

				}
				dbContext.DeviceHistories.Add(new DeviceHistory()
				{
					DeviceId = deviceId,
					UserId = userId,
					StartDate = DateTime.Now
				});
			}
			else
			{
				if (currentyHistory == null)
					return Ok("Nothing to do, already unassigned");
				else
				{
					currentyHistory.EndDate = DateTime.Now;
					dbContext.DeviceHistories.Update(currentyHistory);
				}
			}

			dbContext.SaveChanges();

			return Ok("OK");
		}
	}
}
