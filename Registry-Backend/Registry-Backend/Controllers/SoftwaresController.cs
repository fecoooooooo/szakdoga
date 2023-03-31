using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Registry_Backend.DTO;
using Registry_Backend.Models;
using System.Net;

namespace Registry_Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class SoftwaresController : ControllerBase
	{
		private readonly RegistryContext dbContext;

		public SoftwaresController(RegistryContext dbContext)
		{
			this.dbContext = dbContext;
		}

		[HttpGet("AllSoftwares")]
		[ProducesResponseType(typeof(List<Software>), StatusCodes.Status200OK)]
		public IActionResult GetAllSoftwares()
		{
			var result = dbContext.Softwares.ToList();
			if (result != null)
				return Ok(result);

			return NotFound("No rows in table");
		}

		[HttpGet("Single/{id}")]
		[ProducesResponseType(typeof(Software), StatusCodes.Status200OK)]
		public IActionResult GetSoftwareById([FromRoute] int id)
		{
			var software = dbContext.Softwares.Where(x => x.Id == id).FirstOrDefault();
			if (software != null)
				return Ok(software);

			return NotFound($"No software with id: {id}");
		}

		[HttpDelete("Delete/{id}")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult DeleteSoftware(int id)
		{
			var software = dbContext.Softwares.Where(x => x.Id == id).FirstOrDefault();
			if (software != null)
			{
				dbContext.Softwares.Remove(software);
				dbContext.SaveChanges();
				return Ok("OK");
			}

			return NotFound($"No software with id: {id}");
		}


		[HttpPatch("UpdateSoftware")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult UpdateSoftware([FromBody] Software software)
		{
			var oldSoftware = dbContext.Softwares.Where(x => x.Id == software.Id).FirstOrDefault();

			if (oldSoftware != null)
			{
				oldSoftware.License = software.License;
				oldSoftware.Name = software.Name;
				oldSoftware.Description = software.Description;
				oldSoftware.Price = software.Price;
				oldSoftware.ProductLink = software.ProductLink;
				oldSoftware.UserId = software.UserId;
				oldSoftware.IsActive = software.IsActive;

				dbContext.Softwares.Update(oldSoftware);
				dbContext.SaveChanges();
			
				return Ok("OK");
			}

			return NotFound($"No software with id: {software.Id}");
		}

		[HttpPost("AddSoftware")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult AddSoftware([FromBody] Software software)
		{
			dbContext.Softwares.Add(software);
			dbContext.SaveChanges();

			return Ok("OK");
		}


		[HttpGet("HistoryForSoftware/{id}")]
		[ProducesResponseType(typeof(List<SoftwareHistory>), StatusCodes.Status200OK)]
		public IActionResult GetHistoryForSoftwareById([FromRoute] int id)
		{
			var histories = dbContext.SoftwareHistories
				.Where(x => x.SoftwareId == id)
				.OrderBy(x => x.StartDate).ToList();

			if (histories != null)
				return Ok(histories);

			return NotFound($"No software with id: {id}");
		}

		[HttpGet("SoftwaresForUser/{id}")]
		[ProducesResponseType(typeof(List<SoftwaresForUserResponse>), StatusCodes.Status200OK)]
		public IActionResult GetHistoryForUserById([FromRoute] string id)
		{
			var histories = dbContext.SoftwareHistories
				.Where(x => x.UserId == id)
				.Where(x => x.EndDate == null).ToList();

			var user = dbContext.AspNetUsers.Where(x => x.Id == id).FirstOrDefault();
			if (user == null)
				return NotFound($"No user with id: {id}");

			List<SoftwaresForUserResponse> response = new List<SoftwaresForUserResponse>();
			if (histories != null)
			{
				foreach (var h in histories)
				{
					response.Add(new SoftwaresForUserResponse()
					{
						Name = dbContext.Softwares.Where(x => x.Id == h.SoftwareId).FirstOrDefault()?.Name,
						StartDate = h.StartDate
					});
				}
			}
			return Ok(response);
		}

		[HttpPost("AddHistoryEntry")]
		[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
		public IActionResult AddHistoryEntry([FromQuery] int softwareId, [FromQuery] string userId, [FromQuery] bool startAssignment)
		{
			var software = dbContext.Softwares.Where(x => x.Id == softwareId).FirstOrDefault();
			if (software == null)
				return NotFound($"No software with id: {softwareId}");

			var user = dbContext.AspNetUsers.Where(x => x.Id == userId);
			if (user == null)
				return NotFound($"No user with id: {userId}");

			var allHistory = dbContext.SoftwareHistories.ToList();

			var currentyHistory = dbContext.SoftwareHistories
				.Where(x => x.EndDate == null)
				.Where(x => x.SoftwareId == softwareId).FirstOrDefault();

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
						dbContext.SoftwareHistories.Update(currentyHistory);
					}

				}
				dbContext.SoftwareHistories.Add(new SoftwareHistory()
				{
					SoftwareId = softwareId,
					UserId = userId,
					StartDate = DateTime.Now
				});
			}
			else
			{
				if (currentyHistory == null)
					throw new Exception("Not assigned to user, can't terminate");
				else
				{
					currentyHistory.EndDate = DateTime.Now;
					dbContext.SoftwareHistories.Update(currentyHistory);
				}
			}

			dbContext.SaveChanges();

			return Ok("OK");
		}
	}
}
