using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
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
    }
}
