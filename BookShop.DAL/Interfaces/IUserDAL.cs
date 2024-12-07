using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IUserDAL
    {
        Task<UserDTO?> Get(string email);

        Task Create(UserDTO user);


    }
}
