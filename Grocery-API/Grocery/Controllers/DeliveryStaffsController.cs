using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Grocery.Model;

namespace Grocery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryStaffsController : ControllerBase
    {
        private readonly GroceryDbContext _context;

        public DeliveryStaffsController(GroceryDbContext context)
        {
            _context = context;
        }

        // GET: api/DeliveryStaffs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryStaff>>> GetDeliveryStaffs()
        {
            var deliveryStaffs = await _context.DeliveryStaffs
                .Include(ds => ds.User) // Includes the related User entity
                .Select(ds => new
                {
                    ds.StaffId,
                    ds.VehicleNumber,
                    ds.PhoneNumber,
                    User = new
                    {
                        ds.User.UserId,  // UserId from the related User entity
                        ds.User.Name,
                        ds.User.Email
                    }
                })
                .ToListAsync();

            return Ok(deliveryStaffs);
        }


        // GET: api/DeliveryStaffs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryStaff>> GetDeliveryStaff(int id)
        {
            var deliveryStaff = await _context.DeliveryStaffs.FindAsync(id);

            if (deliveryStaff == null)
            {
                return NotFound();
            }

            return deliveryStaff;
        }

        // PUT: api/DeliveryStaffs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeliveryStaff(int id, DeliveryStaff deliveryStaff)
        {
            if (id != deliveryStaff.StaffId)
            {
                return BadRequest();
            }

            _context.Entry(deliveryStaff).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeliveryStaffExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DeliveryStaffs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DeliveryStaff>> PostDeliveryStaff(DeliveryStaff deliveryStaff)
        {
            _context.DeliveryStaffs.Add(deliveryStaff);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeliveryStaff", new { id = deliveryStaff.StaffId }, deliveryStaff);
        }

        // DELETE: api/DeliveryStaffs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeliveryStaff(int id)
        {
            var deliveryStaff = await _context.DeliveryStaffs.FindAsync(id);
            if (deliveryStaff == null)
            {
                return NotFound();
            }

            _context.DeliveryStaffs.Remove(deliveryStaff);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeliveryStaffExists(int id)
        {
            return _context.DeliveryStaffs.Any(e => e.StaffId == id);
        }
    }
}
