using Service.Dto;
using System.Security.Principal;
using System.Threading.Tasks;

namespace Service.Services
{
    public class UserService : BaseService
    {
        public UserService(IIdentity authenticatedUser)
            : base(authenticatedUser) { }

        public async Task<UserDto> GetByUsername(string username)
        {
            if (username == "test")
                return new UserDto
                {
                    Username = "test"
                };

            return null;
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequest)
        {
            var user = await GetByUsername(loginRequest.Username);

            if (user == null)
                return null;

            return new LoginResponseDto
            {
                Username = user.Username
            };
        }
    }
}
