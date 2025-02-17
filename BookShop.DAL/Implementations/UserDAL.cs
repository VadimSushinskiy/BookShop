﻿using BookShop.DAL.Interfaces;
using BookShop.DAL.Models.Entities;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;

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
                .Include(user => user.Cart)
                .Select(user => user.MapToDTO())
                .FirstOrDefaultAsync();
        }

        public async Task<List<ViewUserDTO>> GetALL(string name, int pageNumber, int pageSize)
        {
            return await _context.ViewUsers.AsNoTracking()
                .Where(user => EF.Functions.Like(user.Name, $"%{name}%"))
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize + 1)
                .Select(user => user.MapToDTO())
                .ToListAsync();
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
                .Where(cart => cart.Id == newUser.Cart.Id)
                .FirstAsync();

            newCart.UserId = newUser.Id;

            await _context.SaveChangesAsync();
        }

        public async Task ChangeRole(int id, string role)
        {
            if (role == "User" || role == "Admin")
            {
                await _context.Database.ExecuteSqlRawAsync("EXECUTE ChangeRole @Id, @Role", parameters: [new SqlParameter("@Id", id), new SqlParameter("@Role", role)]);
            }
        }
    }
}
