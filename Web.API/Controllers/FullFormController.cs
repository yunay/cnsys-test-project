using Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class FullFormController : Controller
    {
        [HttpGet]
        [ProducesResponseType(typeof(FullForm), StatusCodes.Status200OK)]
        public IActionResult GetData(CancellationToken cancellationToken)
        {
            var result = new FullForm();

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(typeof(FullForm), StatusCodes.Status200OK)]
        public IActionResult PostData([FromBody] FullForm data, CancellationToken cancellationToken)
        {
            return Ok(data);
        }
    }
}