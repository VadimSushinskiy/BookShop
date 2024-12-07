using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class UserDAL : IUserDAL
    {
        public UserDAL(SqlServerContext context)
        {
            _context = context;
        }

        private readonly SqlServerContext _context;

        public async Task<UserDTO?> Get(string email)
        {
            return await _context.Users
                .AsNoTracking()
                .Where(user => user.Email == email)
                .Select(user => user.MapToDTO())
                .FirstOrDefaultAsync();
        }

        public async Task Create(UserDTO userDto)
        {
            User? user = await _context.Users
                .AsNoTracking()
                .Where(user => user.Email == userDto.Email)
                .FirstOrDefaultAsync();

            if (user != null)
            {
                throw new Exception("Error! User with this email already exists");
            }

            User newUser = new User();
            newUser.MapFromDTO(userDto);

            Cart cart = new Cart
            {
                Id = Guid.NewGuid().ToString(),
                TotalPrice = 0
            };

            newUser.Cart = cart;

            await _context.Users.AddAsync(newUser);
            await _context.Carts.AddAsync(cart);
                
            await _context.SaveChangesAsync();

            Cart newCart = await _context.Carts
                .Where(cart => cart.Id == newUser.CartId)
                .FirstAsync();

            newCart.UserId = newUser.Id;

            await _context.SaveChangesAsync();
        }
    }
}
