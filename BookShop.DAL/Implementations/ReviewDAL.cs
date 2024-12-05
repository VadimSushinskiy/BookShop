using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class ReviewDAL : IReviewDAL
    {
        public ReviewDAL(SqlServerContext context)
        {
            _context = context;
        }

        private readonly SqlServerContext _context;

        public async Task<IEnumerable<ReviewDTO>> GetWithPagination(int bookId, int pageNumber, int pageSize)
        {
            return await _context.Reviews.Include(review => review.User)
                .AsNoTracking()
                .Where(review => review.BookId == bookId)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(review => review.MapToDTO())
                .ToListAsync();
        }

        public async Task Create(ReviewDTO reviewDto, int userId, int bookId)
        {
            Review review = new Review();
            review.MapFromDTO(reviewDto);
            review.UserId = userId;
            review.BookId = bookId;

            _context.Attach(review);
            await _context.SaveChangesAsync();
        }
    }
}
