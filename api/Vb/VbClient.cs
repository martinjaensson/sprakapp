using System;
using Common;
using Visma.BusinessServices.Client;
using Visma.BusinessServices.Generic;
using Visma.BusinessServices.Wrapper;

namespace Vb
{
    /// <summary>
    /// Helper class to wrap the VBS generic service
    /// </summary>
    public class VbClient : IDisposable
    {
        private readonly GenericServiceClient _serviceClient = new GenericServiceClient();

        public RequestBuilder Request { get; set; }

        public Context Context { get; set; }

        private ResponseReader _responseReader;

        public VbClient()
        {
            // Set credentials
            Credentials cred = new Credentials("standard", Config.VbAuthUser, Config.VbAuthPassword);
            cred.Apply(_serviceClient.ClientCredentials);

            // Create request
            Request = new RequestBuilder();
            Context = Request.AddContext();
            Context.UserName = Config.VbContextUser;
            Context.CompanyNo = Config.VbCompanyNumber;
            Context.CultureId = CultureId.Swedish__Sweden;
        }

        public ResponseReader Dispatch()
        {
            _responseReader = Request.Dispatch(_serviceClient);
            return _responseReader;
        }

        public string GetErrorMessage()
        {
            if (_responseReader == null || _responseReader.AllSucceeded)
                return null;

            return ReadError(_responseReader);
        }

        public void Dispose()
        {
            ((IDisposable)_serviceClient).Dispose();
        }


        private static string ReadError(ResponseReader responseReader)
        {
            var errorMessage = "";

            var errorOperations = responseReader.GetOperationsWithErrors();

            foreach (var errorOperation in errorOperations)
            {
                foreach (var message in errorOperation.Messages)
                    errorMessage += message.Text + "; ";

                // Check for row errors
                var rowErrors = errorOperation.GetRowsWithErrors();

                foreach (var rowError in rowErrors)
                    foreach (var rowErrorMessage in rowError.Messages)
                        errorMessage += rowErrorMessage.Text + "; ";
            }

            return errorMessage;
        }
    }
}