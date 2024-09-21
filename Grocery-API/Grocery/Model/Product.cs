using System.ComponentModel.DataAnnotations;

namespace Grocery.Model
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        
        [StringLength(100)]
        public string? Name { get; set; }

        public string? Description { get; set; }

        
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        public string? ImageUrl { get; set; }  // URL of the product image

        [Required]
        public int StoreId { get; set; }  // Foreign key to GroceryStore

        public GroceryStore? GroceryStore { get; set; }  // Navigation property to GroceryStore
        public ICollection<OrderItem> ?OrderItems { get; set; }
    }
}
