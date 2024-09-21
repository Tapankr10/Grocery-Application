using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Grocery.Model
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        
        public int CustomerId { get; set; }  // Foreign key to Customer

        
        public DateTime OrderDate { get; set; }

        
        [StringLength(20)]
        public string? Status { get; set; }  // E.g., Pending, Completed, Delivered

        public int? DeliveryStaffId { get; set; }  // Nullable foreign key to DeliveryStaff

        public Customer Customer { get; set; }  // Navigation property to Customer
        public DeliveryStaff? DeliveryStaff { get; set; }  // Navigation property to DeliveryStaff
        public ICollection<OrderItem>? OrderItems { get; set; }  // Navigation property to OrderItems

        // Calculated property to get the total price
        [NotMapped]
        public decimal? TotalPrice;
    }

    public class OrderUpdateModel
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public int CustomerId { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }  // E.g., Pending, Completed, Delivered

        public int? DeliveryStaffId { get; set; }
    }
}
