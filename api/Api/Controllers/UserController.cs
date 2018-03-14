using Api.Filters;
using Api.Models;
using Service.Services;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace Api.Controllers
{
    [AuthenticationFilter]
    [Authorize]
    public class UserController : ApiController
    {
        /// <summary>
        /// Get the authenticated user
        /// </summary>
        /// <returns></returns>
        [Route("User/Authenticated")]
        public async Task<HttpResponseMessage> GetAuthenticatedUser()
        {
            // Get the username from the principal if possible
            string username = RequestContext.Principal?.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                // TODO: We should ensure that IPrincipal.Name is set when the principal is created and use that property instead.
                var claimsIdentity = RequestContext.Principal?.Identity as ClaimsIdentity;
                if (claimsIdentity != null)
                    username = claimsIdentity.Claims.FirstOrDefault(c => c.Type == "username")?.Value;
            }

            // Report an error if the authenticated user could not be found
            if (string.IsNullOrEmpty(username))
                return Request.CreateResponse(HttpStatusCode.OK,
                    ApiResponse.CreateErrorResponse(ErrorCode.MissingItem, "The authenticated user could not be identified."));


            // Get the user from the database
            using (var service = new UserService(RequestContext.Principal.Identity))
            {
                var result = await service.GetByUsername(username);

                if (result == null)
                    return Request.CreateResponse(HttpStatusCode.OK,
                        ApiResponse.CreateErrorResponse(ErrorCode.MissingItem, $"No user with username {username} exists"));
                else
                    return Request.CreateResponse(HttpStatusCode.OK, ApiResponse.Create(result));
            }
        }

        [Route("User")]
        public async Task<HttpResponseMessage> GetUsers()
        {
            using (var service = new UserService(RequestContext.Principal.Identity))
            {
                var users = await service.getUsers();
                return Request.CreateResponse(ApiResponse.Create(users));
            }
        }
    }
}
