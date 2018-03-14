using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using Service.Database;

namespace Service.Services
{
    //Fredrik pillar runt lite
    public class BaseService : IDisposable
    {
        public BaseService(IIdentity authenticatedUser)
        {
            DatabaseContext = new DbContext(authenticatedUser);
            ExtractUserData(authenticatedUser);
        }

        /// <summary>
        /// Extracts user data from claims and adds it to
        /// protected attributes, making it accessable from all services.
        /// </summary>
        /// <param name="authenticatedUser"></param>
        private void ExtractUserData(IIdentity authenticatedUser)
        {
            var claimsIdentity = authenticatedUser as ClaimsIdentity;
            if (claimsIdentity != null)
            {

            }
        }

        public DbContext DatabaseContext { get; set; }

        #region IDisposable Support
        private bool _disposedValue; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    // Dispose managed state (managed objects).
                    DatabaseContext.Dispose();
                }

                _disposedValue = true;
            }
        }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
        }
        #endregion
    }
}