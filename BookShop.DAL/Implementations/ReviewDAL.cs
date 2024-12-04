using BookShop.DAL.Interfaces;
using BookShop.DAL.Models;
using BookShop.DAL.Tools;
using BookShop.Shared.DTO;
using Microsoft.EntityFrameworkCore;

namespace BookShop.DAL.Implementations
{
    public class ReviewDAL : IReviewDAL
    {
        public async Task<IEnumerable<ReviewDTO>> GetWithPagination(int bookId, int pageNumber, int pageSize)
        {
            using (SqlServerContext context = new SqlServerContext())
            {
                return await context.Reviews.Include(review => review.User)
                    .AsNoTracking()
                    .Where(review => review.BookId == bookId)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .Select(review => review.MapToDTO())
                    .ToListAsync();
            }
        }

        public async Task Create(ReviewDTO reviewDto, int userId, int bookId)
        {
            Review review = new Review();
            review.MapFromDTO(reviewDto);
            review.UserId = userId;
            review.BookId = bookId;

            using (SqlServerContext context = new SqlServerContext())
            {
                context.Attach(review);
                await context.SaveChangesAsync();
            }
        }
    }
}
