using System.ComponentModel.DataAnnotations;

namespace BookShop.BLL.Models
{
    public class LoginUser
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
