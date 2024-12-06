using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IOrderDAL
    {
        Task Create(OrderDTO orderDTO, string cartId);

        Task Delete(int orderId);

        Task ChangeCount(int orderId, int change);
    }
}
