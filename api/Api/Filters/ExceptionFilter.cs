using Api.Models;
using Service.Exceptions;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace Api.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            var exception = actionExecutedContext.Exception;

            if (exception is ErpException)
                actionExecutedContext.Response =
                    actionExecutedContext.Request.CreateResponse(HttpStatusCode.InternalServerError, new ApiResponse
                    {
                        Error = new ApiError
                        {
                            ErrorCode = ErrorCode.InternalError,
                            Message = exception.Message,
                            StackTrace = exception.StackTrace
                        }
                    });
            else if (exception is ValidationException)
                actionExecutedContext.Response =
                    actionExecutedContext.Request.CreateResponse(HttpStatusCode.BadRequest, new ApiResponse
                    {
                        Error = new ApiError
                        {
                            ErrorCode = ErrorCode.ValidationError,
                            Message = exception.Message,
                            StackTrace = exception.StackTrace
                        }
                    });
            else
                // Other exceptions are reported as internal error
                actionExecutedContext.Response =
                    actionExecutedContext.Request.CreateResponse(HttpStatusCode.InternalServerError, new ApiResponse
                    {
                        Error = new ApiError
                        {
                            ErrorCode = ErrorCode.InternalError,
                            Message = exception.Message,
                            StackTrace = exception.StackTrace
                        }
                    });
        }
    }
}