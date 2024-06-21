namespace Programowanie_Lab2.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string address { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;

        public string role { get; set; } = "klient";
        public string token { get; set; } = string.Empty;
        public required string username { get; set; }
            public required string password { get; set; }
    }
}
