using BookShop.BLL.Models;
using BookShop.DAL.Models;
using BookShop.Shared.DTO;

namespace BookShop.BLL.Tools.Implementations
{
    public static class BLLMapper
    {
        public static BookDTO MapToDto(this FormBook book)
        {
            List<ImageDTO> images = new List<ImageDTO>();

            if (book.MainImage != null)
            {
                images.Add(new ImageDTO { IsMain = true });
            }
            images.AddRange(book.ImgFiles.Select(x => new ImageDTO { IsMain = false }));

            return new BookDTO
            {
                Id = book.Id,
                Name = book.Name,
                Description = book.Description,
                Genre = book.Genre,
                Language = book.Language,
                AuthorName = book.AuthorName,
                PublishingName = book.PublishingName,
                Volume = book.Volume,
                Price = book.Price,
                PublicationYear = book.PublicationYear,
                CoverType = book.CoverType,
                Images = images
            };
        }

        public static void MapFromDto(this ResponseBook book, BookDTO bookDto)
        {
            book.Id = bookDto.Id;
            book.Name = bookDto.Name;
            book.Description = bookDto.Description;
            book.Genre = bookDto.Genre;
            book.Language = bookDto.Language;
            book.AuthorName = bookDto.AuthorName;
            book.AuthorCountry = bookDto.AuthorCountry;
            book.PublishingName = bookDto.PublishingName;
            book.PublishingCountry = bookDto.PublishingCountry;
            book.Volume = bookDto.Volume;
            book.Price = bookDto.Price;
            book.Rating = bookDto.Rating;
            book.RatingNumber = bookDto.RatingNumber;
            book.CoverType = bookDto.CoverType;
            book.PublicationYear = bookDto.PublicationYear;
        }

        public static ResponseCart MapFromDto(this CartDTO cart)
        {
            ResponseCart response = new ResponseCart();

            response.Id = cart.Id;
            response.TotalPrice = cart.TotalPrice;

            response.Orders = cart.Orders.Select(order => new ResponseOrder { Id = order.Id, Count = order.Count, Book = order.Book }).ToList();

            return response;
        }
    }
}
