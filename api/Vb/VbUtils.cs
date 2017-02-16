namespace Vb
{
    public class VbUtils
    {

        public static string ConvertIntsToDatestring(int date, int time)
        {
            if (date == 0)
                return null;

            var datestring =
                $"{date.ToString().Substring(0, 4)}-{date.ToString().Substring(4, 2)}-{date.ToString().Substring(6, 2)}";

            if (time > 0)
            {
                var hours = (time < 999 ? "0" : "") + time / 100;
                var minutes = (time % 100 <= 9 ? "0" : "") + time % 100;

                datestring += $" {hours}:{minutes}";
            }

            return datestring;
        }

        public static int[] ConvertDatestringToInts(string datestring)
        {
            if (datestring == null)
                return new[] { 0, 0 };

            var dateAndTime = datestring.Split(' ');
            var date = dateAndTime[0];
            var time = dateAndTime.Length > 1 ? dateAndTime[1] : "0";

            return new[] { int.Parse(date.Replace("-", "")), int.Parse(time.Replace(":", "")) };
        }

    }
}
