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
    public class OrdersController : ControllerBase
    {
        private readonly GroceryDbContext _context;

        public OrdersController(GroceryDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.Include(c => c.Customer).Include(d => d.DeliveryStaff).ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, OrderUpdateModel orderUpdate)
        {
            if (id != orderUpdate.OrderId)
            {
                return BadRequest();
            }

            var order = (await GetOrder(id)).Value;

            order.OrderDate = orderUpdate.OrderDate;
            order.DeliveryStaffId = orderUpdate.DeliveryStaffId;
            order.CustomerId = orderUpdate.CustomerId;
            order.Status = orderUpdate.Status;

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderModel orderItem)
        {
            var order = new Order()
            {
                CustomerId = orderItem.CustomerId,
                OrderDate = DateTime.Now,
                DeliveryStaffId = 1,
                Status = "Pending",
                OrderItems = new List<OrderItem>()
            };

            foreach (var item in orderItem.ProductList)
            {
                order.OrderItems.Add(new()
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                });

            }
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
        [HttpGet("{orderId}/totalprice")]
        public async Task<ActionResult<decimal>> GetTotalPrice(int orderId)
        {
            var order = await _context.Orders
                                      .Include(o => o.OrderItems)
                                      .ThenInclude(oi => oi.Product) // Include Product to get the price
                                      .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                return NotFound("Order not found.");
            }

            // Calculate total price
            var totalPrice = order.OrderItems.Sum(oi => oi.Quantity * oi.Product.Price);

            return Ok(totalPrice);
        }
    }
}
