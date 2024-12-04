using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface ICartDAL
    {
        Task<CartDTO> GetById(int id);

        Task<int> Create();
    }
}
