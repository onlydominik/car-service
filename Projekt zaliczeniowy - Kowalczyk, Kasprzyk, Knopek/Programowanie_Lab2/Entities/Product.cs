namespace Programowanie_Lab2.Entities
{
    public class Product
        
    {
        public int Id { get; set; } 
        public required string Name { get; set; }
        public required string Model { get; set; }
        public required string Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; } 
    }
}
