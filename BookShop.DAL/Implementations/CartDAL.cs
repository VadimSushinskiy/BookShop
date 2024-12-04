using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class CartDAL : ICartDAL
    {
        public async Task<CartDTO> GetById(int id)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                return await context.Carts
                    .AsNoTracking()
                    .Where(cart => cart.Id == id)
                    .Select(cart => cart.MapToDTO())
                    .SingleAsync();
            }
        }

        public async Task<int> Create()
        {
            Cart cart = new Cart
            {
                TotalPrice = 0
            };

            using (SqlServerContext context = new SqlServerContext())
            {
                context.Carts.Attach(cart);
                await context.SaveChangesAsync();
                return cart.Id;
            }
        }
    }
}
