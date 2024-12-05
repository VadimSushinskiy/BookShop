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

        public async Task<UserDTO?> Get(string email, string password)
        {
            return await _context.Users
                .AsNoTracking()
                .Where(user => user.Email == email && user.Password == password)
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
                TotalPrice = 0,
                User = newUser
            };

            newUser.Cart = cart;

            _context.Users.Attach(newUser);
            _context.Carts.Attach(cart);
                
            await _context.SaveChangesAsync();
        }
    }
}
