using BookShop.Shared.DTO;

namespace BookShop.DAL.Interfaces
{
    public interface IReviewDAL
    {
        Task<IEnumerable<ReviewDTO>> GetWithPagination(int bookId, int pageNumber, int pageSize, int additionalSkip);

        Task Create(ReviewDTO review, int userId, int bookId);
    }
}
