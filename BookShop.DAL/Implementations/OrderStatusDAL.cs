using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class OrderStatusDAL : IOrderStatusDAL
    {
        public OrderStatusDAL(SqlServerContext context)
        {
            _context = context;
        }

        private readonly SqlServerContext _context;

        public async Task<IEnumerable<OrderStatusDTO>> GetByUserId(int userId)
        {
            return await _context.OrderStatuses
                .AsNoTracking()
                .Where(status => status.UserId == userId)
                .OrderByDescending(status => status.Id)
                .Select(status => status.MapToDTO())
                .ToListAsync();
        }

        public async Task Create(OrderStatusDTO orderStatusDto, int? userId, string cartId)
        {
            OrderStatus orderStatus = new OrderStatus();
            orderStatus.MapFromDTO(orderStatusDto);
            if (userId != null)
            {
                orderStatus.UserId = userId;
            }

            Cart? cart = await _context.Carts.Where(cart => cart.Id == cartId).FirstOrDefaultAsync();
            Dictionary<string, decimal> deliveryPrices = new Dictionary<string, decimal> { { "UkrPosta", 40 }, { "NovaPosta", 60 }, { "UkrPostaCourier", 80 }, { "NovaPostaCourier", 120 } };
            Dictionary<string, string> deliveryTypes = new Dictionary<string, string> { { "UkrPosta", "Укрпошта" }, { "NovaPosta", "Нова Пошта" }, { "UkrPostaCourier", "Кур'єр Укрпошта" }, { "NovaPostaCourier", "Кур'єр Нова Пошта" } };

            decimal deliveryPrice = deliveryPrices.ContainsKey(orderStatusDto.DeliveryType) ? deliveryPrices[orderStatusDto.DeliveryType] : deliveryPrices["NovaPosta"];

            orderStatus.TotalPrice = cart.TotalPrice + deliveryPrice;
            orderStatus.DeliveryType = deliveryTypes.ContainsKey(orderStatusDto.DeliveryType) ? deliveryTypes[orderStatusDto.DeliveryType] : deliveryTypes["NovaPosta"];

            await _context.OrderStatuses.AddAsync(orderStatus);

            await _context.Carts
                .Where(cart => cart.Id == cartId)
                .ExecuteUpdateAsync(cart => cart.SetProperty(c => c.TotalPrice, 0));

            await _context.Orders
                .Where(order => order.CartId == cartId)
                .ExecuteDeleteAsync();

            await _context.SaveChangesAsync();
        }
    }
}

