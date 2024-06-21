namespace Programowanie_Lab2.Entities
{
    public class Transaction
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string email { get; set; } = string.Empty;
        public required string description { get; set; } = "Brak opisu";
        public required string date { get; set; }
        public required string car { get; set; }
        public required string model { get; set; }
        public string status { get; set; } = "Aktualna";
        public string totalcost { get; set; } = "(oczekuje na wycenę)";
        public int margin { get; set; } = 25;
    }
}
