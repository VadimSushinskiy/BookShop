using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class OrderDAL : IOrderDAL
    {
        public async Task Create(OrderDTO orderDTO, int cartId)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                Order? checkOrder = await context.Orders
                    .Where(order => order.CartId == cartId && order.BookId == orderDTO.Book.Id)
                    .FirstOrDefaultAsync();
                if (checkOrder != null)
                {
                    checkOrder.Count++;
                    await context.SaveChangesAsync();
                }
                else
                {
                    Order order = new Order();
                    order.MapFromDTO(orderDTO);
                    order.CartId = cartId;
                    context.Orders.Attach(order);

                    await context.SaveChangesAsync();
                }
            }
        }

        public async Task Delete(int orderId)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                await context.Orders
                    .Where(order => order.Id == orderId)
                    .ExecuteDeleteAsync();
            }
        }

        public async Task ChangeCount(int orderId, int change)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                Order? order = await context.Orders.
                    Where(order => order.Id == orderId)
                    .FirstOrDefaultAsync();
                if (order != null)
                {
                    if (change > 0 || order.Count > 1)
                    {
                        order.Count += change;
                    }
                    else
                    {
                        context.Orders.Remove(order);
                    }
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
