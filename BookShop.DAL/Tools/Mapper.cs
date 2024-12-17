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
                Rating = book.Rating,
                RatingNumber = book.RatingNumber,
                CoverType = book.CoverType,
                PublicationYear = book.PublicationYear,
                AuthorName = book.Author.Fullname,
                PublishingName = book.Publishing.Name,
                Images = book.Images.Select(image => image.MapToDTO()).ToList()
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
            book.Rating = bootDto.Rating;
            book.RatingNumber = bootDto.RatingNumber;
            book.CoverType = bootDto.CoverType;
            book.PublicationYear = bootDto.PublicationYear;
        }

        public static UserDTO? MapToDTO(this User? user)
        {
            if (user == null) return null;

            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                Role = user.Role,
                CartId = user.CartId,
            };
        }

        public static void MapFromDTO(this User user, UserDTO? userDto)
        {
            if (userDto == null) return;

            user.Name = userDto.Name;
            user.Email = userDto.Email;
            user.Password = userDto.Password;
            user.Role = userDto.Role;
        }

        public static ReviewDTO? MapToDTO(this Review? review)
        {
            if (review == null) return null;

            return new ReviewDTO
            {
                Id = review.Id,
                Text = review.Text,
                Rating = review.Rating,
                UserName = review.User.Name,
                WritingDate = review.WritingDate,
            };
        }

        public static void MapFromDTO(this Review review, ReviewDTO? reviewDto)
        {
            if (reviewDto == null) return;

            review.Text = reviewDto.Text;
            review.Rating = reviewDto.Rating;
            review.WritingDate = reviewDto.WritingDate;
        }

        public static OrderStatusDTO? MapToDTO(this OrderStatus? orderStatus)
        {
            if (orderStatus == null) return null;

            return new OrderStatusDTO
            {
                Id = orderStatus.Id,
                TotalPrice = orderStatus.TotalPrice,
                Status = orderStatus.Status,
                CreatedDate = orderStatus.CreatedDate,
                Name = orderStatus.Name,
                Address = orderStatus.Address,
            };
        }

        public static void MapFromDTO(this OrderStatus orderStatus, OrderStatusDTO orderStatusDto)
        {
            if (orderStatus == null) return;

            orderStatus.TotalPrice = orderStatusDto.TotalPrice;
            orderStatus.Status = orderStatusDto.Status;
            orderStatus.CreatedDate = orderStatusDto.CreatedDate;
            orderStatus.Name = orderStatusDto.Name;
            orderStatus.Address = orderStatusDto.Address;
        }

        public static OrderDTO? MapToDTO(this Order? order)
        {
            if (order == null) return null;

            return new OrderDTO
            {
                Id = order.Id,
                Count = order.Count,
                Book = order.Book.MapToDTO()
            };
        }

        public static void MapFromDTO(this Order order, OrderDTO? orderDto)
        {
            if (order == null) return;

            order.Count = orderDto.Count;
            order.BookId = orderDto.Book.Id;
        }

        public static CartDTO? MapToDTO(this Cart? cart)
        {
            if (cart == null) return null;

            return new CartDTO
            {
                Id = cart.Id,
                TotalPrice = cart.TotalPrice,
                Orders = cart.Orders.Select(order => order.MapToDTO()).ToList()
            };
        }

        public static void MapFromDTO(this Author author, AuthorDTO? authorDto)
        {
            if (author == null) return;

            author.Fullname = authorDto.Fullname;
            author.Country = authorDto.Country;
        }

        public static AuthorDTO? MapToDTO(this Author? author)
        {
            if (author == null) return null;

            return new AuthorDTO
            {
                Fullname = author.Fullname,
                Country = author.Country
            };
        }

        public static void MapFromDTO(this Publishing publishing, PublishingDTO? publishingDto)
        {
            if (publishing == null) return;

            publishing.Name = publishingDto.Name;
            publishing.Country = publishingDto.Country;
        }

        public static PublishingDTO? MapToDTO(this Publishing? publishing)
        {
            if (publishing == null) return null;

            return new PublishingDTO
            {
                Name = publishing.Name,
                Country = publishing.Country
            };
        }

        public static Image MapFromDTO(this ImageDTO imageDto, int bookId)
        {
            return new Image { IsMain = imageDto.IsMain, BookId = bookId };
        }

        public static ImageDTO MapToDTO(this Image image)
        {
            return new ImageDTO
            {
                Id = image.Id,
                IsMain = image.IsMain
            };
        }

        public static ViewUserDTO MapToDTO(this ViewUser viewUser)
        {
            return new ViewUserDTO
            {
                Id = viewUser.Id,
                Name = viewUser.Name,
                Email = viewUser.Email,
                Role = viewUser.Role,
                Total = viewUser.Total,
                OrderCount = viewUser.OrderCount,
            };
        }
    }
}
