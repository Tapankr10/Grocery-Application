using Grocery.Model;
using Grocery.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Grocery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroceryStoreController : ControllerBase
    {

        private readonly GroceryStoreService _groceryStoreService;

        public GroceryStoreController(Service.GroceryStoreService groceryStoreService)
        {
            _groceryStoreService = groceryStoreService;
        }
        // GET: api/<GroceryStoreController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroceryStore>>> GetAllGroceryStore()
        {
            try
            {
                var grocerys = await _groceryStoreService.GetAllGroceryStoreAsync();

                // Check if articles is null or empty
                if (grocerys == null || !grocerys.Any())
                {
                    return NotFound("No Store found.");
                }

                return Ok(grocerys);
            }
            catch (Exception ex)
            {
                // Log the exception details (if you have a logging framework)
                // _logger.LogError(ex, "An error occurred while fetching articles.");

                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        // GET api/<GroceryStoreController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var grocerys = await _groceryStoreService.GetGroceryStore(id);
            if (grocerys == null) return NotFound();

            // Increment view count


            return Ok(grocerys);
        }

        // POST api/<GroceryStoreController>
        [HttpPost]
        public async Task<IActionResult> AddGroceryStore([FromBody] Model.GroceryStore  groceryStore)
        {
            if (groceryStore == null) return BadRequest("Course cannot be null");

            await _groceryStoreService.AddGroceryStoreAsync(groceryStore);
            return CreatedAtAction(nameof(GetAllGroceryStore), new { id = groceryStore.StoreId }, groceryStore);
        }

        // PUT api/<GroceryStoreController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroceryStore(int id, [FromBody] GroceryStore groceryStore)
        {
            if (id != groceryStore.StoreId) return BadRequest("Author ID mismatch");

            await _groceryStoreService.UpdateGroceryStoresync(groceryStore);
            return NoContent();
        }
        // DELETE api/<GroceryStoreController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrocery(int id)
        {
            await _groceryStoreService.DeleteAsync(id);
            return NoContent();
        }
    }
}
