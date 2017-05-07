namespace Api.Models
{
    /// <summary>
    /// Response class used for all non-error results.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ApiResponse<T>
    {
        public T Data { get; set; }
    }

    /// <summary>
    /// Response class used for reporting an error.
    /// </summary>
    public class ApiResponse
    {
        public static ApiResponse<T> Create<T>(T data)
        {
            return new ApiResponse<T> { Data = data };
        }

        public static ApiResponse CreateErrorResponse(ErrorCode errorCode, string format, params object[] args)
        {
            return new ApiResponse
            {
                Error = new ApiError
                {
                    ErrorCode = errorCode,
                    Message = string.Format(format, args)
                }
            };
        }

        public ApiError Error { get; set; }
    }
}
