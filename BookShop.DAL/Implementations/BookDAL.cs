﻿using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using System.Collections.Generic;

namespace BookShop.DAL.Implementations
{
    public class BookDAL : IBookDAL
    {
        public BookDAL(SqlServerContext context) 
        {
            _context = context;
        }

        private readonly SqlServerContext _context;

        public async Task<BookDTO?> GetById(int id)
        {
            return await _context.Books.Include(book => book.Author).Include(book => book.Publishing)
                .AsNoTracking()
                .Where(book => book.Id == id)
                .Include(book => book.Images.Where(image => !image.IsMain))
                .Select(book => book.MapToDTO())
                .SingleOrDefaultAsync();
        }

        public async Task<List<BookDTO>> GetWithFilterAndPagination(FilterDTO filter, int pageNumber, int pageSize, string? sort)
        {
            var books = _context.Books.Include(book => book.Author).Include(book => book.Publishing)
                .AsNoTracking()
                .Where(book => EF.Functions.Like(book.Name, $"%{filter.Name}%")
                && EF.Functions.Like(book.Genre, $"%{filter.Genre}%")
                && EF.Functions.Like(book.Language, $"%{filter.Language}%")
                && EF.Functions.Like(book.Author.Fullname, $"%{filter.AuthorName}%")
                && book.Price >= filter.MinPrice
                && book.Price <= filter.MaxPrice
                && book.Rating >= filter.Rating)
                .Include(book => book.Images.OrderByDescending(image => image.IsMain));
                
            List<BookDTO> result;
            switch (sort)
            {
                case "rating":
                    {
                        result = await books.OrderByDescending(book => book.Rating).Skip((pageNumber - 1) * pageSize).Take(pageSize + 1).Select(book => book.MapToDTO()).ToListAsync();
                        break;
                    }
                case "cheap":
                    {
                        result = await books.OrderBy(book => book.Price).Skip((pageNumber - 1) * pageSize).Take(pageSize + 1).Select(book => book.MapToDTO()).ToListAsync();
                        break;
                    }
                case "expensive":
                    {
                        result = await books.OrderByDescending(book => book.Price).Skip((pageNumber - 1) * pageSize).Take(pageSize + 1).Select(book => book.MapToDTO()).ToListAsync();
                        break;
                    }
                default:
                    {
                        result = await books.Skip((pageNumber - 1) * pageSize).Take(pageSize + 1).Select(book => book.MapToDTO()).ToListAsync();
                        break;
                    }
            }
            return result;
        }

        public async Task<List<int>> Create(BookDTO bookDto)
        {
            Author? author = await _context.Authors.AsNoTracking().Where(author => author.Fullname == bookDto.AuthorName).FirstOrDefaultAsync();

            if (author == null)
            {
                throw new Exception("Error! Author doesn't exist");
            }

            Publishing? publishing = await _context.Publishings.AsNoTracking().Where(author => author.Name == bookDto.PublishingName).FirstOrDefaultAsync();

            if (publishing == null)
            {
                throw new Exception("Error! Publishing doesn't exist");
            }

            Book book = new Book();
            book.MapFromDTO(bookDto);
            book.AuthorId = author.Id;
            book.PublishingId = publishing.Id;
            await _context.Books.AddAsync(book);

            await _context.SaveChangesAsync();

            List<Image> images = bookDto.Images.Select(image => image.MapFromDTO(book.Id)).ToList();

            await _context.Images.AddRangeAsync(images);

            await _context.SaveChangesAsync();

            return images.Select(image => image.Id).ToList();
        }

        public async Task<(List<int>, List<int>)> Update(BookDTO bookDto)
        {
            Author? author = await _context.Authors.AsNoTracking().Where(author => author.Fullname == bookDto.AuthorName).FirstOrDefaultAsync();

            if (author == null)
            {
                throw new Exception("Error! Author doesn't exist");
            }

            Publishing? publishing = await _context.Publishings.AsNoTracking().Where(author => author.Name == bookDto.PublishingName).FirstOrDefaultAsync();

            if (publishing == null)
            {
                throw new Exception("Error! Publishing doesn't exist");
            }

            await _context.Books
                .Where(book => book.Id == bookDto.Id)
                .ExecuteUpdateAsync(book => book
                    .SetProperty(c => c.Name, bookDto.Name)
                    .SetProperty(c => c.Description, bookDto.Description)
                    .SetProperty(c => c.Price, bookDto.Price)
                    .SetProperty(c => c.Language, bookDto.Language)
                    .SetProperty(c => c.Volume, bookDto.Volume)
                    .SetProperty(c => c.Genre, bookDto.Genre)
                    .SetProperty(c => c.AuthorId, author.Id)
                    .SetProperty(c => c.PublishingId, publishing.Id)
                    );

            if (bookDto.Images.Count() > 0)
            {
                List<Image> deletedImg = await _context.Images.Where(image => image.BookId == bookDto.Id).ToListAsync();

                _context.Images.RemoveRange(deletedImg);

                List<Image> images = bookDto.Images.Select(image => image.MapFromDTO(bookDto.Id)).ToList();

                await _context.Images.AddRangeAsync(images);

                await _context.SaveChangesAsync();

                return (deletedImg.Select(image => image.Id).ToList(), images.Select(image => image.Id).ToList());
            }
            return (new(), new());
        }

        public async Task<List<int>> Delete(int id)
        {
            Book? book = await _context.Books.Where(book => book.Id == id).Include(b => b.Images).FirstOrDefaultAsync();

            if (book == null)
            {
                throw new Exception("Book not found");
            }

            List<int> ids = book.Images.Select(image => image.Id).ToList();

            _context.Books.Remove(book);

            await _context.SaveChangesAsync();

            return ids;
        }
    }
}
