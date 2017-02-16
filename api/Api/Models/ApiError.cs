namespace Api.Models
{
    public class ApiError
    {
        public string Message { get; set; }

        public ErrorCode ErrorCode { get; set; }

        public string StackTrace { get; set; }

    }

    public enum ErrorCode
    {
        MissingItem,
        InternalError,
        MissingPassword,
        ValidationError,
        Other
    }
}