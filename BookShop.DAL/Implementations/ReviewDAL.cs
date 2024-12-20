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

        public async Task<ReviewDTO?> Get(int id)
        {
            return await _context.Reviews.Where(review => review.Id == id).Include(review => review.User).Select(review => review.MapToDTO()).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ReviewDTO>> GetWithPagination(int bookId, int pageNumber, int pageSize, int additionalSkip)
        {
            return await _context.Reviews.Include(review => review.User)
                .AsNoTracking()
                .Where(review => review.BookId == bookId)
                .OrderByDescending(review => review.Id)
                .Skip((pageNumber - 1) * pageSize + additionalSkip)
                .Take(pageSize + 1)
                .Select(review => review.MapToDTO())
                .ToListAsync();
        }

        public async Task<int> Create(ReviewDTO reviewDto, int userId, int bookId)
        {
            Review review = new Review();
            review.MapFromDTO(reviewDto);
            review.UserId = userId;
            review.BookId = bookId;

            await _context.Books
                .Where(book => book.Id == bookId)
                .ExecuteUpdateAsync(book => book
                    .SetProperty(b => b.Rating, b => (b.Rating * b.RatingNumber + review.Rating) / (b.RatingNumber + 1))
                    .SetProperty(b => b.RatingNumber, b => b.RatingNumber + 1));

            await _context.AddAsync(review);
            await _context.SaveChangesAsync();

            return review.Id;
        }

        public async Task Update(ReviewDTO reviewDto)
        {
            var review = await _context.Reviews.Where(review => review.Id == reviewDto.Id).Include(review => review.Book).FirstOrDefaultAsync();

            if (review == null)
            {
                throw new Exception("Review with this id doesn't exist");
            }

            await _context.Books.Where(book => book.Id == review.BookId).ExecuteUpdateAsync(book => book
            .SetProperty(b => b.Rating, b => (b.Rating * b.RatingNumber - review.Rating + reviewDto.Rating) / b.RatingNumber));

            review.Rating = reviewDto.Rating;
            review.Text = reviewDto.Text;

            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var review = await _context.Reviews.Where(review => review.Id == id).Include(review => review.Book).FirstOrDefaultAsync();

            if (review == null)
            {
                throw new Exception("Review with this id doesn't exist");
            }

            await _context.Books.Where(book => book.Id == review.BookId).ExecuteUpdateAsync(book => book
            .SetProperty(b => b.Rating, b => (b.Rating * b.RatingNumber - review.Rating) / (b.RatingNumber - 1))
            .SetProperty(b => b.RatingNumber, b => b.RatingNumber - 1));

            _context.Reviews.Remove(review);

            await _context.SaveChangesAsync();
        }
    }
}
