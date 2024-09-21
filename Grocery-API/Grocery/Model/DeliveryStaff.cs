using System.ComponentModel.DataAnnotations;

namespace Grocery.Model
{
    public class DeliveryStaff
    {
        [Key]
        public int StaffId { get; set; }

        
        public int UserId { get; set; }  // Foreign key to User

        
        [StringLength(50)]
        public string? VehicleNumber { get; set; }

       
        public string? PhoneNumber { get; set; }  // Add phone number field

        public User? User { get; set; }  // Navigation property to User
        public ICollection<Order>? Orders { get; set; }
    }
}
