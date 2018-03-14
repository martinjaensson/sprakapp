using Service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
    }
}
