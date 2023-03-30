using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
			int maxId = dbContext.Softwares.Max(x => x.Id);

			software.Id = maxId + 1;
			dbContext.Softwares.Add(software);
			dbContext.SaveChanges();

			return Ok("OK");
		}
	}
}
