using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IOrderStatusDAL
    {
        Task<IEnumerable<OrderStatusDTO>> GetByUserId(int userId);

        Task Create(OrderStatusDTO orderStatus, int? userId, string cartId);
    }
}
