﻿using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
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
            Order? checkOrder = await _context.Orders
                .Where(order => order.CartId == cartId && order.BookId == orderDTO.Book.Id)
                .FirstOrDefaultAsync();
            if (checkOrder != null)
            {
                checkOrder.Count++;
                await _context.SaveChangesAsync();
            }
            else
            {
                Order order = new Order();
                order.MapFromDTO(orderDTO);
                order.CartId = cartId;
                await _context.Orders.AddAsync(order);

                await _context.SaveChangesAsync();
            }
        }

        public async Task Delete(int orderId)
        {
            await _context.Orders
                .Where(order => order.Id == orderId)
                .ExecuteDeleteAsync();
        }

        public async Task ChangeCount(int orderId, int change)
        {
            Order? order = await _context.Orders.
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
                    _context.Orders.Remove(order);
                }
                await _context.SaveChangesAsync();
            }
        }
    }
}
