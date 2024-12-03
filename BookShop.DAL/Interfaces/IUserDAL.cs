using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IUserDAL
    {
        UserDTO? Get(string email, string password);
    }
}
