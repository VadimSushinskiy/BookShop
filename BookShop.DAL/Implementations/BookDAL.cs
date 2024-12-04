using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class BookDAL : IBookDAL
    {
        public async Task<BookDTO?> GetById(int id)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                return await context.Books.Include(book => book.Author).Include(book => book.Publishing)
                    .AsNoTracking()
                    .Where(book => book.Id == id)
                    .Select(x => x.MapToDTO())
                    .SingleOrDefaultAsync();
            }
        }

        public async Task<IEnumerable<BookDTO>> GetWithFilterAndPagination(FilterDTO filter, int pageNumber, int pageSize)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                Task<List<BookDTO>> books = context.Books.Include(book => book.Author).Include(book => book.Publishing)
                    .AsNoTracking()
                    .Where(book => EF.Functions.Like(book.Name, $"%{filter.Name}%") 
                    && EF.Functions.Like(book.Genre, $"%{filter.Genre}%") 
                    && EF.Functions.Like(book.Language, $"%{filter.Language}%") 
                    && EF.Functions.Like(book.Author.Fullname, $"%{filter.AuthorName}%")
                    && book.Price >= filter.MinPrice 
                    && book.Price <= filter.MaxPrice)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .Select(book => book.MapToDTO()).ToListAsync()!;
                return await books;
            }
        }

        public async Task Create(BookDTO BookDto)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                Author? author = await context.Authors.AsNoTracking().Where(author => author.Fullname == BookDto.AuthorName).FirstOrDefaultAsync();

                if (author == null)
                {
                    throw new Exception("Error! Author doesn't exist");
                }

                Publishing? publishing = await context.Publishings.AsNoTracking().Where(author => author.Name == BookDto.PublishingName).FirstOrDefaultAsync();

                if (publishing == null)
                {
                    throw new Exception("Error! Publishing doesn't exist");
                }

                Book book = new Book();
                book.MapFromDTO(BookDto);
                book.Author = author;
                book.Publishing = publishing;
                context.Books.Attach(book);
                await context.SaveChangesAsync();
            }
        }

        public async Task Update(BookDTO BookDto)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                Author? author = await context.Authors.AsNoTracking().Where(author => author.Fullname == BookDto.AuthorName).FirstOrDefaultAsync();

                if (author == null)
                {
                    throw new Exception("Error! Author doesn't exist");
                }

                Publishing? publishing = await context.Publishings.AsNoTracking().Where(author => author.Name == BookDto.PublishingName).FirstOrDefaultAsync();

                if (publishing == null)
                {
                    throw new Exception("Error! Publishing doesn't exist");
                }

                await context.Books.
                    AsNoTracking()
                    .Where(book => book.Id == BookDto.Id)
                    .ExecuteUpdateAsync(book => book
                        .SetProperty(c => c.Name, BookDto.Name)
                        .SetProperty(c => c.Description, BookDto.Description)
                        .SetProperty(c => c.Price, BookDto.Price)
                        .SetProperty(c => c.Language, BookDto.Language)
                        .SetProperty(c => c.Volume, BookDto.Volume)
                        .SetProperty(c => c.Genre, BookDto.Genre)
                        .SetProperty(c => c.Author, author)
                        .SetProperty(c => c.Publishing, publishing)
                        );
            }
        }

        public async Task Delete(int id)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                await context.Books
                    .AsNoTracking()
                    .Where(author => author.Id == id)
                    .ExecuteDeleteAsync();
            }
        }
    }
}
