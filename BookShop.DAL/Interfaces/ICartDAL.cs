using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface ICartDAL
    {
        Task<CartDTO?> GetById(string id);

        Task<CartDTO> Create();
    }
}
