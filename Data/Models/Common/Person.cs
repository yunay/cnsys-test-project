namespace Data.Models.Common
{
    public class Person
    {
        public string FirstName { get; set; }

        public string FamilyName { get; set; }

        public DateTime? BirthDate { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string Address { get; set; }

        public List<Colors> FavoriteColors { get; set; }

        public Gender? Gender { get; set; }
    }
}