using Service.Dto;
using Service.Entities;
using System.Collections;
using System.Linq;

namespace Service.Translators
{
    public class UserTranslator
    {
        public static UserDto Translate(User user)
        {
            if (user == null)
                return null;

            return new UserDto
            {
                UserId = user.UserId,
                Username = user.Username,
                Name = user.Name
            };
        }

    }
}
