using System.ComponentModel.DataAnnotations;

namespace Grocery.Model
{
    public class GroceryStore
    {
        [Key]
        public int StoreId { get; set; }

       
        [StringLength(100)]
        public string? Name { get; set; }

        
        [StringLength(200)]
        public string ?Location { get; set; }

       
        public string? ContactNumber { get; set; }

        public ICollection<Product>? Products { get; set; }  // Navigation property to Products
    }
}
