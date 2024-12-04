using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface ICartDAL
    {
        CartDTO GetById(int id);
    }
}
