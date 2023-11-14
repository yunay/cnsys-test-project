namespace Data.Models.Common
{
    public class FifthLevel
    {
        public string FifthLevelText { get; set; }
    }

    public class FourthLevel
    {
        public string FourthLevelText { get; set; }

        public FifthLevel FifthLevel { get; set; }
    }

    public class ThirdLevel
    {
        public string ThirdLevelText { get; set; }

        public FourthLevel FourthLevel { get; set; }
    }

    public class SecondLevel
    {
        public string SecondLevelText { get; set; }

        public ThirdLevel ThirdLevel { get; set; }
    }

    public class FirstLevel
    {
        public string FirstLevelText { get; set; }

        public SecondLevel SecondLevel { get; set; }
    }

    public class MultiLevelModel
    {
        public FirstLevel FirstLevel { get; set; }
    }
}
