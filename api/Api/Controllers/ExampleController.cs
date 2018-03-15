using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Logic.Services;
using Logic.Database.Entities;
using System.Threading.Tasks;
using Api.Models;

namespace Api.Controllers
{
    [Route("[controller]")]
    public class ExampleController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> Get([FromServices]ExampleService exampleService)
        {
            var result = await exampleService.List();
            return new OkObjectResult(ApiResponse.Create(result));
        }

        [HttpGet]
        [Route("Create")]
        public bool Create([FromServices]ExampleService exampleService)
        {
            return exampleService.Create();
        }

        [HttpGet]
        [Route("Test")]
        public async Task<IActionResult> Test()
        {
            return new OkObjectResult(ApiResponse.Create(true));
        }

    }
}
