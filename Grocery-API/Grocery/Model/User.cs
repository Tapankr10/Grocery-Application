using System.ComponentModel.DataAnnotations;

namespace Grocery.Model
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

       
        [StringLength(100)]
        public string? Name { get; set; }

       
        [EmailAddress]
        public string ?Email { get; set; }

        
        public string ? Password { get; set; }

       
        [StringLength(20)]
        public string? Role { get; set; }  // Role can be Customer or DeliveryPartner
    
}
}
