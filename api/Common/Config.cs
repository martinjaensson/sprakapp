using System;
using System.Configuration;
using System.Globalization;

namespace Common
{
    public class Config
    {

        #region Jwt token 
        public static string JwtSigningKey => ConfigurationManager.AppSettings["JWT_SIGNING_KEY"];

        public static string JwtSigningAlgorithm => ConfigurationManager.AppSettings["JWT_SIGNING_ALGORITHM"];

        public static System.TimeSpan JwtExpirationTime
        {
            get
            {
                var stringValue = ConfigurationManager.AppSettings["JWT_EXPIRATION_TIME"];
                if (!string.IsNullOrWhiteSpace(stringValue))
                {
                    TimeSpan result;
                    if (TimeSpan.TryParse(stringValue, CultureInfo.InvariantCulture, out result))
                        return result;
                }

                // Return a default value of 1 hour
                return new TimeSpan(1, 0, 0);
            }
        }

        #endregion

        #region VB

        public static string VbAuthUser => ConfigurationManager.AppSettings["VB_AUTH_USER"];

        public static string VbAuthPassword => ConfigurationManager.AppSettings["VB_AUTH_PASSWORD"];

        public static string VbContextUser => ConfigurationManager.AppSettings["VB_CONTEXT_USER"];

        public static int VbIntegrationActor => int.Parse(ConfigurationManager.AppSettings["VB_INTEGRATION_ACTOR"]);

        public static int VbCompanyNumber => int.Parse(ConfigurationManager.AppSettings["VB_COMPANY_NUMBER"]);

        #endregion

    }
}