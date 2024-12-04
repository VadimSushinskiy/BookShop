using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class OrderStatusDAL : IOrderStatusDAL
    {
        public async Task<IEnumerable<OrderStatusDTO>> GetByUserId(int userId)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                return await context.OrderStatuses
                    .AsNoTracking()
                    .Where(status => status.UserId == userId)
                    .Select(status => status.MapToDTO())
                    .ToListAsync();
            }
        }

        public async Task Create(OrderStatusDTO orderStatusDto, int userId)
        {
            OrderStatus orderStatus = new OrderStatus();
            orderStatus.MapFromDTO(orderStatusDto);
            orderStatus.UserId = userId;

            using (SqlServerContext context = new SqlServerContext())
            {
                context.OrderStatuses.Attach(orderStatus);

                await context.SaveChangesAsync();
            }
        }
    }
}
