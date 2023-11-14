using Data.Models.Common;

namespace Data.Models
{
    public class FullForm
    {
        public string FormName { get; set; }

        public Person Owner { get; set; }

        public List<Person> Users { get; set; }

        public MultiLevelModel MultiLevelModel { get; set; }
    }
}