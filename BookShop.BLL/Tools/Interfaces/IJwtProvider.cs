using BookShop.Shared.DTO;

namespace BookShop.BLL.Tools.Interfaces
{
    public interface IJwtProvider
    {
        public string GenerateToken(UserDTO user);
    }
}
