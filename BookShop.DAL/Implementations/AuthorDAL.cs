using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
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
    }
}
