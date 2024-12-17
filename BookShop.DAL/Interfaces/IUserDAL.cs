using BookShop.DAL.Models;
using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IUserDAL
    {
        Task<UserDTO?> Get(string email);

        Task Create(UserDTO user);

        Task<List<ViewUserDTO>> GetALL(string name, int pageNumber, int pageSize);

        Task ChangeRole(int id, string role);
    }
}
