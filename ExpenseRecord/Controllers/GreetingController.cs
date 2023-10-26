/*using Microsoft.AspNetCore.Mvc;

namespace ExpenseRecord.Controllers;

[ApiController]
[Route("[controller]")]
public class GreetingController : ControllerBase
{
    [HttpGet]
    public string greet(string name)
    {
        Console.Out.WriteLine(name);
        return "Hello, " + name;
    }
}*/


using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using ExpenseRecord.Model;
using ExpenseRecord.Service;
using ExpenseRecord;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDoList.Api.Controllers
{

    //[Route("api/v1/items")]
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ToDoItemsController : ControllerBase
    {

        private readonly IToDoItemService _toDoItemService;
        public ToDoItemsController(IToDoItemService service)
        {
            _toDoItemService = service;
        }


        // Create a new todo item
        [HttpPost]
        [ProducesResponseType(typeof(ToDoItem), 201)]   // Success
        [ProducesResponseType(typeof(ToDoItem), 400)]   // InvalidRequest
        // [ProducesResponseType(typeof(ToDoItem), 409)]   // Conflict
        public async Task<ActionResult<ToDoItem>> Post([FromBody] ToDoListRequest toDoListRequest)
        {
            // if (!ModelState.IsValid) { return BadRequest(ModelState);}

            var result = new ToDoItem()
            {
                Description = toDoListRequest.Description,
                Done = toDoListRequest.Done,
                //Favorite = toDoListRequest.Favorite,
            };
            await _toDoItemService.Create(result);
            return Created("", result);  // 201;
        }


        // Upsert a todo item
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ToDoItem), 200)]  // success
        [ProducesResponseType(typeof(ToDoItem), 201)]
        [ProducesResponseType(typeof(ToDoItem), 400)]  // InvalidRequest
        [ProducesResponseType(typeof(ToDoItem), 404)]
        public async Task<ActionResult<ToDoItem>> UpsertItem(string id, [FromBody] ToDoItem toDoItem)
        {
            bool isCreate = false;
            var existingItem = await _toDoItemService.Get(id);
            if (existingItem is null)
            {
                isCreate = true;
                await _toDoItemService.Create(toDoItem);
            }
            else
            {
                await _toDoItemService.Upsert(id, toDoItem);
            }

            return isCreate ? Created("", toDoItem) : Ok(toDoItem);
        }



        // Get item by id
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ToDoItem), 200)]  // success
        [ProducesResponseType(typeof(ToDoItem), 404)]
        public async Task<ActionResult<ToDoItem>> Get(string id)
        {
            var result = await _toDoItemService.Get(id);
            if (result == null)
            {
                return NotFound($"The item with id {id} doesn't exist.");
            }

            // return NotFound();
            // return Created("", result);
            // return NoContent();
            return Ok(result);  // return 200;
        }


        // Get all Items
        [HttpGet]
        [ProducesResponseType(typeof(ToDoItem), 200)]  // success
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<ToDoItem>>> GetAll()
        {
            var res = await _toDoItemService.Get();
            return Ok(res);
        }



        // Delete a todo item
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ToDoItem), 204)]  // success
        [ProducesResponseType(typeof(ToDoItem), 404)]
        public async Task<ActionResult> Delete(string id)
        {
            var isSuccessful = await _toDoItemService.Remove(id);
            if (!isSuccessful)                  // true => is deleted
            {
                return NotFound($"The item with id {id} doesn't exist.");
            }
            else                               // false => not found
            {
                return NoContent();
            }
        }
    }
}
