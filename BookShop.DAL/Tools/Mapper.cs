using BookShop.DAL.Models;
using BookShop.Shared.DTO;

namespace BookShop.DAL.Tools
{
    public static class Mapper
    {
        public static BookDTO? MapToDTO(this Book? book)
        {
            if (book == null) return null;

            return new BookDTO
            {
                Id = book.Id,
                Name = book.Name,
                Description = book.Description,
                Price = book.Price,
                Genre = book.Genre,
                Volume = book.Volume,
                Language = book.Language,
                AuthorName = book.Author.Fullname,
                PublishingName = book.Publishing.Name
            };
        }

        public static void MapFromDTO(this Book book, BookDTO? bootDto)
        {
            if (bootDto == null) return;

            book.Name = bootDto.Name;
            book.Description = bootDto.Description;
            book.Price = bootDto.Price;
            book.Genre = bootDto.Genre;
            book.Volume = bootDto.Volume;
            book.Language = bootDto.Language;
        }
    }
}
