﻿using BookShop.DAL.Interfaces;
using BookShop.DAL.Models.Entities;
using BookShop.DAL.Models.Views;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class PublishingDAL : IPublishingDAL
    {
        public PublishingDAL(SqlServerContext context)
        {
            _context = context;
        }

        private readonly SqlServerContext _context;

        public async Task<PublishingDTO?> Get(string name)
        {
            return await _context.Publishings
                .AsNoTracking()
                .Where(publishing => publishing.Name == name)
                .Select(publishing => publishing.MapToDTO())
                .FirstOrDefaultAsync();
        }

        public async Task<List<ViewPublishingDTO>> GetStatistics(string name, int pageNumber, int pageSize)
        {
            return await _context.ViewPublishing.AsNoTracking()
                .Where(publishing => EF.Functions.Like(publishing.Name, $"%{name}%"))
                .OrderByDescending(publishing => publishing.TotalSold)
                .ThenBy(publishing => publishing.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize + 1)
                .Select(publishing => publishing.MapToDTO())
                .ToListAsync();
        }

        public async Task Create(PublishingDTO publishingDto)
        {
            Publishing? _publishing = await _context.Publishings.AsNoTracking().Where(p => p.Name == publishingDto.Name).FirstOrDefaultAsync();

            if (_publishing != null)
            {
                throw new Exception("Автор з таким ім'ям вже існує");
            }

            Publishing publishing = new Publishing();

            publishing.MapFromDTO(publishingDto);

            await _context.Publishings.AddAsync(publishing);
            await _context.SaveChangesAsync();
        }

        public async Task Update(string name, PublishingDTO publishingDto)
        {
            await _context.Publishings
                .Where(publishing => publishing.Name == name)
                .ExecuteUpdateAsync(publishing => publishing
                .SetProperty(p => p.Name, publishingDto.Name)
                .SetProperty(p => p.Country, publishingDto.Country));
        }

        public async Task Delete(string name)
        {
            Publishing? publishing = await _context.Publishings.Where(publishing => publishing.Name == name).FirstOrDefaultAsync();

            if (publishing == null)
            {
                throw new Exception("Publishing not found");
            }

            _context.Publishings.Remove(publishing);

            await _context.SaveChangesAsync();
        }
    }
}
