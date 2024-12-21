using BookShop.DAL.Interfaces;
using BookShop.DAL.Models.Entities;
using BookShop.DAL.Models.Views;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class AuthorDAL : IAuthorDAL
    {
        public AuthorDAL(SqlServerContext context)
        {
            _context = context;
        }

        private readonly SqlServerContext _context;

        public async Task<AuthorDTO?> Get(string name)
        {
            return await _context.Authors
                .AsNoTracking()
                .Where(author => author.Fullname == name)
                .Select(author => author.MapToDTO())
                .FirstOrDefaultAsync();
        }

        public async Task<List<ViewAuthorDTO>> GetStatistics(string name, int pageNumber, int pageSize)
        {
            return await _context.ViewAuthor.AsNoTracking()
                .Where(author => EF.Functions.Like(author.Fullname, $"%{name}%"))
                .OrderByDescending(author => author.TotalSold)
                .ThenBy(author => author.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize + 1)
                .Select(author => author.MapToDTO())
                .ToListAsync();
        }

        public async Task Create(AuthorDTO authorDto)
        {
            Author? _author = await _context.Authors.AsNoTracking().Where(a => a.Fullname == authorDto.Fullname).FirstOrDefaultAsync();

            if (_author != null)
            {
                throw new Exception("Автор з таким ім'ям вже існує");
            }

            Author author = new Author();

            author.MapFromDTO(authorDto);

            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();
        }

        public async Task Update(string name, AuthorDTO authorDto)
        {
            await _context.Authors
                .Where(author => author.Fullname == name)
                .ExecuteUpdateAsync(author => author
                .SetProperty(a => a.Fullname, authorDto.Fullname)
                .SetProperty(a => a.Country, authorDto.Country));
        }

        public async Task Delete(string name)
        {
            Author? author = await _context.Authors.Where(author => author.Fullname == name).FirstOrDefaultAsync();

            if (author == null)
            {
                throw new Exception("Author not found");
            }

            _context.Authors.Remove(author);

            await _context.SaveChangesAsync();
        }
    }
}
