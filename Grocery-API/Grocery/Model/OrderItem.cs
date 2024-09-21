using System.ComponentModel.DataAnnotations;

namespace Grocery.Model
{
    public class OrderModel
    {
        public int CustomerId { get; set; }  // Foreign key to Order

        public List<ProductList> ProductList { get; set; }  // Foreign key to Product
    }

    public class ProductList
    {
        public int ProductId { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
    public class OrderItem
    {
        [Key]
        public int OrderItemId { get; set; }

        public int OrderId { get; set; }  // Foreign key to Order

        public int ProductId { get; set; }  // Foreign key to Product

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
        
        public Order Order { get; set; }  // Navigation property to Order
        public Product Product { get; set; }  // Navigation property to Product

    }
}
