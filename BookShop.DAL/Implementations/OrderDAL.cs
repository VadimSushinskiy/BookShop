using BookShop.DAL.Interfaces;
using BookShop.DAL.Models.Entities;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class OrderDAL : IOrderDAL
    {
        public OrderDAL(SqlServerContext context)
        {
            _context = context;
        }

        private readonly SqlServerContext _context;

        public async Task Create(OrderDTO orderDTO, string cartId)
        {
            Book? book = await _context.Books.Where(book => book.Id == orderDTO.Book.Id).FirstOrDefaultAsync();
            if (book == null || book.Count <= 0)
            {
                throw new Exception("Book count is less then 1");
            }
            Order? checkOrder = await _context.Orders
                .Where(order => order.CartId == cartId && order.BookId == orderDTO.Book.Id)
                .FirstOrDefaultAsync();
            if (checkOrder != null)
            {
                checkOrder.Count++;
            }
            else
            {
                Order order = new Order();
                order.MapFromDTO(orderDTO);
                order.CartId = cartId;
                await _context.Orders.AddAsync(order);
            }
            await _context.SaveChangesAsync();

            await _context.Carts
                .Where(cart => cart.Id == cartId)
                .ExecuteUpdateAsync(cart => cart.SetProperty(c => c.TotalPrice, c => c.TotalPrice + orderDTO.Book.Price));

            await _context.Books
                .Where(book => book.Id == orderDTO.Book.Id)
                .ExecuteUpdateAsync(book => book.SetProperty(b => b.Count, b => b.Count - 1));
        }

        public async Task Delete(int orderId)
        {
            Order? order = await _context.Orders
                .Where(order => order.Id == orderId)
                .Include(order => order.Book)
                .FirstOrDefaultAsync();
            if (order != null)
            {
                await _context.Carts
                .Where(cart => cart.Id == order.CartId)
                .ExecuteUpdateAsync(cart => cart.SetProperty(c => c.TotalPrice, c => c.TotalPrice - order.Book.Price * order.Count));

                await _context.Books
                .Where(book => book.Id == order.BookId)
                .ExecuteUpdateAsync(cart => cart.SetProperty(b => b.Count, b => b.Count + order.Count));

                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
        }

        public async Task ChangeCount(int orderId, int change)
        {
            Order? order = await _context.Orders
                .Where(order => order.Id == orderId)
                .Include(order => order.Book)
                .FirstOrDefaultAsync();

            if (order == null || order.Book.Count < change)
            {
                throw new Exception("Book count is less then 1");
            }

            if (change > 0 || order.Count > 1)
            {
                order.Count += change;
            }
            else
            {
                _context.Orders.Remove(order);
            }
            await _context.SaveChangesAsync();

            await _context.Carts
            .Where(cart => cart.Id == order.CartId)
            .ExecuteUpdateAsync(cart => cart.SetProperty(c => c.TotalPrice, c => c.TotalPrice + order.Book.Price * change));

            await _context.Books
            .Where(book => book.Id == order.BookId)
            .ExecuteUpdateAsync(cart => cart.SetProperty(b => b.Count, b => b.Count - change));
        }
    }
}
