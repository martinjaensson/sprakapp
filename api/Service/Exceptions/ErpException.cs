using System;

namespace Service.Exceptions
{
    public class ErpException : Exception
    {
        public ErpException(string message)
            : base(message)
        {
        }
    }
}
