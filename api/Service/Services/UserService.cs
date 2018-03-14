using Service.Dto;
using Service.Translators;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
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
            var dbUser = await DatabaseContext.Users
                .FirstOrDefaultAsync(u => u.Username == username);
            return UserTranslator.Translate(dbUser);
        }

        public async Task<UserDto> GetByUsernameAndPassword(string username, string password)
        {
            var dbUser = await (DatabaseContext.Users
                .FirstOrDefaultAsync(u => u.Username == username && u.Password == password && password != ""));
            var user = UserTranslator.Translate(dbUser);
            return user;
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequest)
        {
            var user = await GetByUsernameAndPassword(loginRequest.Username, loginRequest.Password);

            if (user == null)
                return null;

            return new LoginResponseDto
            {
                Username = user.Username
            };
        }

        public async Task<ICollection<UserDto>> getUsers()
        {
            var users = await DatabaseContext.Users.ToListAsync();

            return users.Select(UserTranslator.Translate).ToList();
        }
    }
}
