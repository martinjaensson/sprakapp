using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Utils
{
    public class IntegerDateConverter
    {
        public static DateTime? IntergerToDateTime(int YYYYMMDD) {
            if (YYYYMMDD != 0)
            {
                int YYYY = Convert.ToInt32(YYYYMMDD.ToString().Substring(0, 4));
                int MM = Convert.ToInt32(YYYYMMDD.ToString().Substring(4, 2));
                int DD = Convert.ToInt32(YYYYMMDD.ToString().Substring(6, 2));
                return new DateTime(YYYY, MM, DD);
            }
            return null;
        }

        public static int DateTimeToInteger(DateTime? date)
        {
            if (date.HasValue)
            {
                var newDate = date.Value.AddHours(12);
                string YYYY = newDate.Year.ToString();
                string MM = newDate.Month < 10 ? "0" + newDate.Month.ToString() : newDate.Month.ToString();
                string DD = newDate.Day < 10 ? "0" + newDate.Day.ToString() : newDate.Day.ToString();
                int YYYYMMDD = Convert.ToInt32(YYYY + MM + DD);
                return YYYYMMDD;
            }
            return 0;
        }
    }
}
