using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Registry_Backend.DTO;
using Registry_Backend.Models;
using Registry_Backend.Shared;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Registry_Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class DebugController : ControllerBase
	{
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
			throw new AppException("400");
		}

		[HttpGet("DEBUG_Example500")]
		public IActionResult Example500()
		{
			throw new Exception("500");
		}
	}
}
