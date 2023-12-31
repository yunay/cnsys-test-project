﻿using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class FullFormController : Controller
    {
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<FullForm>), StatusCodes.Status200OK)]
        public IActionResult GetData([FromQuery] FullFormSearchCriteria criteria, CancellationToken cancellationToken)
        {
            var result = new FullForm();

            return Ok(new List<FullForm>() { result });
        }

        [HttpPost]
        [ProducesResponseType(typeof(FullForm), StatusCodes.Status200OK)]
        public IActionResult PostData([FromBody] FullForm data, CancellationToken cancellationToken)
        {
            return Ok(data);
        }
    }
}