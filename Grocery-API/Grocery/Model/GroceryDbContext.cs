using Microsoft.EntityFrameworkCore;

namespace Grocery.Model
{
    public class GroceryDbContext :DbContext
    {
       

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<GroceryStore> GroceryStores { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<DeliveryStaff> DeliveryStaffs { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        public GroceryDbContext(DbContextOptions<GroceryDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seeding Users
            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, Name = "John Doe", Email = "john.doe@example.com", Password = "hashed_password", Role = "Customer" },
                new User { UserId = 2, Name = "Alice Smith", Email = "alice.smith@example.com", Password = "hashed_password", Role = "DeliveryPartner" }
            );

            // Seeding Customers
            modelBuilder.Entity<Customer>().HasData(
                new Customer { CustomerId = 1, UserId = 1, Address = "123 Main St, Cityville", PhoneNumber = "123-456-7890" }
            );

            // Seeding GroceryStores
            modelBuilder.Entity<GroceryStore>().HasData(
                new GroceryStore { StoreId = 1, Name = "SuperMart", Location = "456 Market St, Cityville", ContactNumber = "555-1234" },
                new GroceryStore { StoreId = 2, Name = "GreenGrocers", Location = "789 Elm St, Townsville", ContactNumber = "555-5678" }
            );

            // Seeding Products
            modelBuilder.Entity<Product>().HasData(
                new Product { ProductId = 1, Name = "Apple", Description = "Fresh Red Apples", Price = 1.5M, ImageUrl = "https://example.com/apple.jpg", StoreId = 1 },
                new Product { ProductId = 2, Name = "Banana", Description = "Organic Bananas", Price = 0.75M, ImageUrl = "https://example.com/banana.jpg", StoreId = 1 },
                new Product { ProductId = 3, Name = "Milk", Description = "Whole Milk 1L", Price = 2.0M, ImageUrl = "https://example.com/milk.jpg", StoreId = 2 }
            );

            // Seeding DeliveryStaff
            modelBuilder.Entity<DeliveryStaff>().HasData(
                new DeliveryStaff { StaffId = 1, UserId = 2, VehicleNumber = "AB1234", PhoneNumber = "555-9876" }
            );

            // Seeding Orders
            modelBuilder.Entity<Order>().HasData(
                new Order { OrderId = 1, CustomerId = 1, OrderDate = DateTime.Now, Status = "Pending", DeliveryStaffId = 1 }
            );

            // Seeding OrderItems
            modelBuilder.Entity<OrderItem>().HasData(
                new OrderItem { OrderItemId = 1, OrderId = 1, ProductId = 1, Quantity = 3 },  // 3 Apples
                new OrderItem { OrderItemId = 2, OrderId = 1, ProductId = 2, Quantity = 5 }   // 5 Bananas
            );
            // Customer to User
            modelBuilder.Entity<Customer>()
                .HasOne(c => c.User) // Each Customer has one User.
                .WithOne() // User is not directly accessible from Customer.
                .HasForeignKey<Customer>(c => c.UserId) // UserId is the foreign key.
                .OnDelete(DeleteBehavior.Cascade); // Deleting User will cascade delete Customer.

            // GroceryStore to Product
            modelBuilder.Entity<GroceryStore>()
                .HasMany(gs => gs.Products) // GroceryStore has many Products.
                .WithOne(p => p.GroceryStore) // Each Product is linked to one GroceryStore.
                .HasForeignKey(p => p.StoreId) // StoreId is the foreign key in Product.
                .OnDelete(DeleteBehavior.Cascade); // Deleting GroceryStore will cascade delete Products.

            // Order to Customer
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer) // Each Order has one Customer.
                .WithMany(c => c.Orders) // Customer can have many Orders.
                .HasForeignKey(o => o.CustomerId) // CustomerId is the foreign key in Order.
                .OnDelete(DeleteBehavior.Cascade); // Deleting Customer will cascade delete Orders.

            // Order to DeliveryStaff
            modelBuilder.Entity<Order>()
                .HasOne(o => o.DeliveryStaff) // Each Order can have one DeliveryStaff.
                .WithMany(ds => ds.Orders) // DeliveryStaff can handle many Orders.
                .HasForeignKey(o => o.DeliveryStaffId) // DeliveryStaffId is the foreign key in Order.
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete on DeliveryStaff.

            // OrderItem to Order
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order) // Each OrderItem is linked to one Order.
                .WithMany(o => o.OrderItems) // Order can have many OrderItems.
                .HasForeignKey(oi => oi.OrderId) // OrderId is the foreign key in OrderItem.
                .OnDelete(DeleteBehavior.Cascade); // Deleting Order will cascade delete OrderItems.

            // OrderItem to Product
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Product) // Each OrderItem is linked to one Product.
                .WithMany(p => p.OrderItems) // Product can have many OrderItems.
                .HasForeignKey(oi => oi.ProductId) // ProductId is the foreign key in OrderItem.
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
