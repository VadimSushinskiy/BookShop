﻿using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class CartDAL : ICartDAL
    {
        public CartDAL(SqlServerContext context)
        {
            _context = context;
        }

        private readonly SqlServerContext _context;

        public async Task<CartDTO?> GetById(string id)
        {
            return await _context.Carts
                .AsNoTracking()
                .Where(cart => cart.Id == id)
                .Select(cart => cart.MapToDTO())
                .SingleAsync();
        }

        public async Task<CartDTO> Create()
        {
            Cart cart = new Cart
            {
                Id = Guid.NewGuid().ToString(),
                TotalPrice = 0
            };

            await _context.Carts.AddAsync(cart);
            await _context.SaveChangesAsync();
            return cart.MapToDTO()!;
        }
    }
}
