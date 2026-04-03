using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class SomeObject
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class SomeObjectController : ControllerBase
    {
        [HttpGet]
        public SomeObject Get([FromRoute] int id)
        {
            var mock = new SomeObject() { Id = id, Name = "Dummy Object Name" };

            return mock;
        }
    }
}
