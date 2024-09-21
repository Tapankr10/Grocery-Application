using System.ComponentModel.DataAnnotations;

namespace Grocery.Model
{
    public class Customer
    {

        [Key]
        public int CustomerId { get; set; }

        
        public int UserId { get; set; }  // Foreign key to User

       
        [StringLength(200)]
        public string? Address { get; set; }

       
        [Phone]
        public string? PhoneNumber { get; set; }

        public User? User { get; set; }  // Navigation property to User
        public ICollection<Order>? Orders { get; set; }  // Navigation property to Orders
    }
}
