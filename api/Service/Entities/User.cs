using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Service.Entities
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("UserId")]
        public int UserId { get; set; }

        [Column("UserName")]
        public string Username { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("Password")]
        public string Password { get; set; }

    }
}
