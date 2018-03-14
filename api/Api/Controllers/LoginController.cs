using Api.Models;
using Api.Utils;
using Common;
using Service.Dto;
using Service.Services;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Api.Controllers
{
    public class LoginController : ApiController
    {
        public async Task<HttpResponseMessage> Post(LoginRequestDto request)
        {
            // Validate the request
            if (request == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid request body");

            // Login
            using (var service = new UserService(RequestContext.Principal.Identity))
            {
                var loginResult = await service.Login(request);
                return CreateLoginResponse(loginResult);
            }
        }

        private HttpResponseMessage CreateLoginResponse(LoginResponseDto loginResult)
        {
            if (loginResult == null)
                return Request.CreateResponse(HttpStatusCode.OK, new ApiResponse
                {
                    Error = new ApiError { Message = "Felaktigt lösenord eller användarnamn" }
                });
            else
            {

                loginResult.Token = JwtUtils.CreateToken(loginResult.Username,
                    Config.JwtSigningKey, Config.JwtSigningAlgorithm);
                HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.OK, ApiResponse.Create(loginResult));
                return msg;
            }
        }
    }
}
